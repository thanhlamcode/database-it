// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// Tạo server JSON
const server = jsonServer.create();

// Thiết lập đường dẫn tới tệp JSON
const filePath = path.join(__dirname, 'db.json');

// Đọc nội dung từ tệp JSON
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);

// Tạo router từ nội dung tệp JSON (cho phép ghi dữ liệu)
const router = jsonServer.router(filePath); // Sử dụng file trực tiếp cho phép ghi dữ liệu

const middlewares = jsonServer.defaults();

// Áp dụng middleware
server.use(middlewares);

// Rewriter để thay đổi URL API
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Sử dụng router đã được cấu hình
server.use(router);

// Khởi động server trên cổng 3000
server.listen(3000, () => {
    console.log('JSON Server is running and allows writing data');
});

// Export server để có thể sử dụng ở nơi khác nếu cần
module.exports = server;
