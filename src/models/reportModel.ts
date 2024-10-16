// Định nghĩa kiểu dữ liệu cho Report
export interface Report {
  id: string;           // ID duy nhất cho báo cáo
  title: string;        // Tiêu đề báo cáo
  description: string;  // Mô tả nội dung báo cáo
  createdAt: Date;      // Ngày tạo báo cáo
  updatedAt: Date;      // Ngày cập nhật báo cáo
  authorId: string;     // ID của tác giả báo cáo (có thể là người dùng)
  status: 'draft' | 'published' | 'archived'; // Trạng thái báo cáo
}
