# 使用官方的 Node 镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 将依赖文件复制到工作目录中
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install

# 将应用程序文件复制到工作目录中
COPY . .

# 设置启动命令
CMD ["npm", "run", "dev"]
