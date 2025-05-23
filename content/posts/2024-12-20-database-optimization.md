---
title: "网络监控与故障排查实践"
date: 2024-12-20T10:30:00+08:00
categories: ["网络运维"]
tags: ["网络监控", "故障排查", "Shell脚本"]
year: "2024"
slug: "database-optimization"
---

## 网络监控与故障排查实践

建立有效的网络监控系统和掌握故障排查方法是网络工程师的核心技能。本文将分享我在企业环境中实践的网络监控和故障排查经验。

### 关键网络监控指标

以下是一个使用Shell脚本监控关键网络指标的例子：

```bash
#!/bin/bash
# 网络关键指标监控脚本

LOG_FILE="/var/log/network_metrics.log"
ALERT_THRESHOLD=80 # 80% 阈值触发告警

# 记录时间戳
timestamp() {
  date "+%Y-%m-%d %H:%M:%S"
}

# 监控网络接口使用率
monitor_interface() {
  interface=$1
  # 获取接口流量统计
  rx_bytes=$(cat /sys/class/net/$interface/statistics/rx_bytes)
  tx_bytes=$(cat /sys/class/net/$interface/statistics/tx_bytes)
  
  # 等待1秒再次获取以计算速率
  sleep 1
  
  rx_bytes_new=$(cat /sys/class/net/$interface/statistics/rx_bytes)
  tx_bytes_new=$(cat /sys/class/net/$interface/statistics/tx_bytes)
  
  # 计算每秒比特数
  rx_bps=$(( (rx_bytes_new - rx_bytes) * 8 ))
  tx_bps=$(( (tx_bytes_new - tx_bytes) * 8 ))
  
  # 获取接口速率
  if [ -e /sys/class/net/$interface/speed ]; then
    speed=$(cat /sys/class/net/$interface/speed)
    speed_bps=$((speed * 1000000))
    
    # 计算利用率百分比
    rx_util=$(echo "scale=2; $rx_bps * 100 / $speed_bps" | bc)
    tx_util=$(echo "scale=2; $tx_bps * 100 / $speed_bps" | bc)
    
    echo "$(timestamp) $interface - RX: ${rx_util}%, TX: ${tx_util}%" >> $LOG_FILE
    
    # 检查是否超过阈值
    rx_int=${rx_util%.*}
    tx_int=${tx_util%.*}
    if [ $rx_int -ge $ALERT_THRESHOLD ] || [ $tx_int -ge $ALERT_THRESHOLD ]; then
      echo "$(timestamp) 警告: $interface 接口利用率超过阈值!" >> $LOG_FILE
    fi
  else
    echo "$(timestamp) $interface - 无法获取接口速率信息" >> $LOG_FILE
  fi
}

# 监控TCP连接状态
monitor_tcp_connections() {
  echo "$(timestamp) TCP连接状态:" >> $LOG_FILE
  echo "  已建立连接: $(netstat -nt | grep ESTABLISHED | wc -l)" >> $LOG_FILE
  echo "  等待连接: $(netstat -nt | grep TIME_WAIT | wc -l)" >> $LOG_FILE
  echo "  监听端口: $(netstat -ntl | grep LISTEN | wc -l)" >> $LOG_FILE
}

# 主函数
echo "$(timestamp) 开始网络监控..." >> $LOG_FILE

# 监控主要网络接口
for interface in eth0 eth1; do
  if [ -e /sys/class/net/$interface ]; then
    monitor_interface $interface
  fi
done

# 监控TCP连接状态
monitor_tcp_connections

echo "$(timestamp) 监控完成." >> $LOG_FILE
```

### 常见网络故障排查方法

网络故障排查遵循一定的方法论：

1. **确定问题范围**：是特定用户、应用还是整个网络受影响
2. **检查物理连接**：线缆、端口、设备指示灯状态
3. **验证网络连通性**：使用ping、traceroute等工具
4. **检查网络配置**：IP地址、子网掩码、默认网关
5. **分析网络流量**：使用tcpdump、Wireshark等工具

### 自动化排查脚本

创建自动化脚本执行基本的网络排查可以提高效率：

```bash
#!/bin/bash
# 基本网络故障排查脚本

# 检查目标主机
TARGET=${1:-"8.8.8.8"}
HOPS=15
echo "开始对 $TARGET 进行网络故障排查..."

# 检查DNS解析
if [[ $TARGET =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "目标是IP地址，跳过DNS检查"
else
  echo -n "检查DNS解析: "
  host $TARGET > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "正常"
    TARGET_IP=$(host $TARGET | grep "has address" | head -1 | awk '{print $4}')
    echo "解析到IP: $TARGET_IP"
  else
    echo "失败 - DNS解析错误"
    exit 1
  fi
fi

# 检查网络连通性
echo -n "检查ICMP连通性: "
ping -c 3 -W 2 $TARGET > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "正常"
else
  echo "失败 - 无法ping通目标"
  echo "进行路径跟踪..."
  traceroute -m $HOPS $TARGET
fi

# 检查TCP连接
echo -n "检查TCP连接(80端口): "
nc -z -w 2 $TARGET 80 > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "正常"
else
  echo "失败 - 无法连接到目标的80端口"
fi

# 检查本地网络接口
echo "检查本地网络接口状态:"
ip addr show | grep -E "^[0-9]+: |inet "

echo "故障排查完成。"
```

在下一篇文章中，我将分享网络设备配置自动化和变更管理的最佳实践。 