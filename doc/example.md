# 栗子

命令行 (中文 zh_CN):

```
壳 --版本
壳 --帮助
壳依 build test
壳 --壳 构建.sh
壳 --调试
壳 --交互
```

命令行 (英文 en):

```
nsh --version
nsh --help
ns build test
nsh --sh build.sh
nsh --debug
nsh --repl
```

交互式:

```
$ 壳
壳 (nsh) 版本 0.1.0-a1
输入 "帮助" 显示使用说明.
> 路径
/home/a
> 去 ..
> 路径
/home
> 退出
$
```

构建脚本:

```sh
#!/usr/bin/env nsh

# 清理
建目录 -确 fm-tpl
删除 --递归 fm-tpl

# 复制文件
建目录 -确 fm-tpl
去 ../..
复制 --递归 doc logo tpl-spec tpl-tool tpld README.md npm/doc/fm-tpl
复制 LICENSE npm/doc/
复制 LICENSE npm/doc/fm-tpl
去 npm/doc/fm-tpl

# 移除空文件
找 --文件 --空 --打印 --删 .
# 移除空目录
找 --目录 --空 --打印 --删 .
```

循环处理 (语法演示):

```sh
# 栗子 测试代码
为 x 系列 3 始
  回显 值 x
终
# 输出
# 0
# 1
# 2

# 实现1
术 系列3 开始 结束 步长 始
  令 计数 值 开始
  当 值 计数 小于 值 结束 始
    产生 值 计数
    计算 计数 += 步长
  终
终

# 参数处理
术 系列2 开始 结束 参3 始
  若 值 参3 等于 空 始
    系列3 值 开始 值 结束 1
  另
    系列3 值 开始 值 结束 值 参3
  终
终

术 系列 参1 参2 参3 始
  若 值 参2 等于 空 始
    系列2 0 值 参1
  另
    系列2 值 参1 值 参2 值 参3
  终
终
```

TODO
