import type { DetailCopy } from '../detail-types';

// Nội dung giới thiệu chi tiết (tiếng Việt). Chỉ ghi các tính năng đã được xác nhận trong mã nguồn.
export const detail: DetailCopy = {
  nav: { market: 'Đồ cũ', tax: 'Hoàn thuế', telecom: 'Điện thoại & mạng' },
  featuresLabel: 'Tính năng chính',
  forWhoLabel: 'Phù hợp với',

  services: {
    market: {
      eyebrow: 'Đồ cũ · Thanh lý trước khi về nước',
      headline: 'Nhẹ nhàng thanh lý đồ không dùng nữa, và tìm món bạn cần ngay gần nơi ở',
      desc: 'Chợ dành cho lao động nước ngoài và du học sinh: mua bán đồ cũ, tặng đồ miễn phí và thanh lý trước khi rời Hàn Quốc. Gặp trực tiếp để giao dịch gần ký túc xá hoặc trường đại học, và khi không cùng ngôn ngữ vẫn có AI dịch hỗ trợ.',
      features: [
        { icon: 'globe', title: 'Hỗ trợ dịch bằng AI', text: 'Mô tả sản phẩm và tin nhắn được dịch sang tiếng mẹ đẻ của bạn, nên dù khác ngôn ngữ bạn vẫn hiểu nội dung giao dịch.' },
        { icon: 'gift', title: 'Tặng đồ miễn phí · Thanh lý trước khi về nước', text: 'Bạn có thể tặng lại đồ không dùng, hoặc dọn gọn đồ điện và nội thất một lượt ở mục thanh lý trước khi về nước.' },
        { icon: 'map', title: 'Giao dịch trực tiếp quanh bạn', text: 'Chọn vị trí và bán kính trên bản đồ để tìm đồ ở gần, rồi hẹn địa điểm và thời gian gặp.' },
        { icon: 'shield', title: 'Xác minh danh tính · Cảnh báo lừa đảo', text: 'Nhận diện ảnh thẻ cư trú người nước ngoài và xác thực bằng SMS giúp xác nhận khi đăng ký, còn những câu đáng ngờ như yêu cầu trả tiền trước hay dẫn sang ứng dụng nhắn tin khác sẽ được hiển thị cảnh báo.' },
        { icon: 'users', title: 'Tin tức khu vực · Thông tin đời sống', text: 'Bạn có thể đọc bảng tin khu vực và blog về đời sống, thuế để biết những điều cần thiết khi sống ở Hàn Quốc, và thêm vào màn hình chính để dùng như một ứng dụng.' },
      ],
      forWho: ['Người lao động sống gần ký túc xá, khu công nghiệp', 'Người đang dọn đồ trước khi về nước', 'Người mới đến cần đồ điện hoặc nội thất', 'Du học sinh'],
    },
    tax: {
      eyebrow: 'Hoàn thuế',
      headline: 'Tìm hiểu việc hoàn thuế phức tạp từng bước một, bằng ngôn ngữ của bạn',
      desc: 'Hướng dẫn bằng ngôn ngữ của bạn để kiểm tra xem có thể nhận lại thuế thu nhập đã nộp khi làm việc tại Hàn Quốc hay không, và nộp đăng ký. Từ tính số tiền dự kiến, nhập giấy tờ, ký điện tử đến thông báo tiến độ đều nằm trong một quy trình liền mạch, còn việc khai thuế được thực hiện thông qua kế toán thuế đối tác.',
      features: [
        { icon: 'calc', title: 'Tính số tiền hoàn thuế dự kiến', text: 'Nhập thời gian làm việc, mức lương và loại visa để tính trước số tiền có thể được hoàn.' },
        { icon: 'camera', title: 'Nhập thông tin từ ảnh thẻ cư trú', text: 'Chụp ảnh thẻ, AI sẽ đọc thông tin để bạn đỡ phải nhập, và chỗ nào đọc sai bạn có thể tự sửa.' },
        { icon: 'file', title: 'Ký điện tử ngay trên màn hình', text: 'Bạn có thể ký giấy ủy quyền và hợp đồng bằng ngón tay ngay trên màn hình, không cần chuẩn bị giấy tờ.' },
        { icon: 'bell', title: 'Thông báo tiến độ qua SMS', text: 'Khi trạng thái xử lý thay đổi, bạn nhận SMS bằng ngôn ngữ của mình, và có thể tiếp tục trao đổi qua Telegram, WhatsApp, Facebook hoặc KakaoTalk.' },
        { icon: 'support', title: 'Quản lý hỗ trợ và tài liệu hướng dẫn', text: 'Khi gặp khó khăn, bạn có thể hỏi quản lý hỗ trợ AI, và khi cần quản trị viên sẽ trực tiếp trả lời. Cũng có phần câu hỏi thường gặp và hướng dẫn về chính sách giảm thuế thu nhập cho người trẻ.' },
      ],
      forWho: ['Lao động nước ngoài đã nộp thuế thu nhập tại Hàn Quốc', 'Người muốn kiểm tra trước xem có được hoàn thuế không', 'Người thấy thuật ngữ thuế tiếng Hàn khó hiểu'],
    },
    telecom: {
      eyebrow: 'Điện thoại · Viễn thông',
      headline: 'Tìm hiểu điện thoại, gói cước và internet cùng một chỗ bằng ngôn ngữ của bạn',
      desc: 'Xem điện thoại thông minh, gói cước và sản phẩm internet/IPTV bằng tiếng mẹ đẻ rồi để lại yêu cầu đăng ký. Sau khi gửi, nhân viên sẽ liên hệ để xác minh danh tính và hỗ trợ kích hoạt.',
      features: [
        { icon: 'globe', title: 'Giao diện 17 ngôn ngữ', text: 'Gói cước, thiết bị, sự kiện và câu hỏi thường gặp được hiển thị bằng 17 ngôn ngữ.' },
        { icon: 'phone', title: 'Xem gói cước · thiết bị', text: 'Bạn có thể xem thông tin về gói cước và điện thoại. Giá và điều kiện sẽ được xác nhận cuối cùng khi tư vấn đăng ký.' },
        { icon: 'file', title: 'Đơn đăng ký trực tuyến', text: 'Chọn đăng ký số mới hoặc chuyển mạng giữ số, nhà mạng, USIM hoặc eSIM rồi gửi đăng ký. Đơn đăng ký không yêu cầu nhập số thẻ cư trú người nước ngoài.' },
        { icon: 'sim', title: 'Hướng dẫn về eSIM', text: 'Bạn có thể tìm hiểu trước eSIM là gì và cách sử dụng trên trang hướng dẫn.' },
        { icon: 'chat', title: 'Quản lý hỗ trợ AI', text: 'Bạn có thể hỏi về gói cước và điện thoại bằng ngôn ngữ của mình. Phạm vi trả lời được giới hạn để không tự bịa ra giá hoặc kết quả xét duyệt.' },
      ],
      forWho: ['Người lần đầu làm số điện thoại ở Hàn Quốc', 'Người thấy các gói cước phức tạp', 'Người ở phòng đơn cần internet, IPTV'],
    },
  },

  intentTitle: 'Dịch vụ nào phù hợp với bạn?',
  intentSub: 'Hãy chạm vào câu gần nhất với việc bạn đang cần.',
  intents: [
    { text: 'Tôi muốn bán hoặc tìm đồ điện, nội thất cũ', service: 'market' },
    { text: 'Tôi muốn dọn đồ trước khi về nước', service: 'market' },
    { text: 'Tôi muốn biết liệu mình có thể nhận lại thuế đã nộp ở Hàn Quốc không', service: 'tax' },
    { text: 'Tôi muốn tìm hiểu điện thoại, gói cước bằng ngôn ngữ của mình', service: 'telecom' },
    { text: 'Phòng tôi cần internet, IPTV', service: 'telecom' },
  ],

  howTitle: 'Cách sử dụng',
  steps: [
    { title: 'Chọn ngôn ngữ', text: 'Chọn ngôn ngữ của bạn trong 17 ngôn ngữ, địa chỉ sẽ đổi thành dạng /vi, và khi chuyển sang dịch vụ vẫn giữ nguyên ngôn ngữ đó. Ngôn ngữ mà dịch vụ không hỗ trợ sẽ chuyển sang tiếng Anh.' },
    { title: 'Chọn dịch vụ bạn cần', text: 'Chạm vào Đồ cũ, Hoàn thuế hoặc Điện thoại & mạng, trang web của dịch vụ đó sẽ mở ra.' },
    { title: 'Tiếp tục trên dịch vụ', text: 'Trang hub không có đăng ký hay đăng nhập. Việc đăng ký và gửi yêu cầu được thực hiện trên từng dịch vụ.' },
  ],

  faqTitle: 'Câu hỏi thường gặp',
  faq: [
    { q: 'Tôi có cần đăng ký thành viên trên hub không?', a: 'Không. Hub chỉ là trang giới thiệu và kết nối đến các dịch vụ, nên không có đăng ký hay đăng nhập. Việc đăng ký và gửi yêu cầu được thực hiện trên từng dịch vụ.' },
    { q: 'Ba dịch vụ có dùng chung một tài khoản không?', a: 'Hiện hub không nhận đăng nhập, và tài khoản cùng thông tin đăng ký được quản lý riêng ở từng dịch vụ.' },
    { q: 'Hỗ trợ những ngôn ngữ nào?', a: 'Hub hỗ trợ 17 ngôn ngữ. Mỗi dịch vụ có danh sách ngôn ngữ riêng, ví dụ Korea Tax Refund Service hỗ trợ 15 ngôn ngữ (không có tiếng Nhật và tiếng Nga). Ngôn ngữ không được hỗ trợ sẽ chuyển sang tiếng Anh.' },
    { q: 'Chi phí là bao nhiêu?', a: 'Sử dụng hub không mất phí. Về chi phí và điều kiện của từng dịch vụ, vui lòng xem thông tin trên dịch vụ đó.' },
    { q: 'Quản lý hỗ trợ có phải là người thật không?', a: 'Ở Korea Tax Refund Service và K-Telecom, quản lý hỗ trợ trả lời bằng AI trước. Ở Korea Tax Refund Service, khi cần quản trị viên cũng có thể trực tiếp trả lời.' },
    { q: 'Hub ghi lại những thông tin gì?', a: 'Chỉ để thống kê lượt truy cập, hub ghi lại ID khách truy cập ẩn danh và nguồn bạn đến (như thẻ quảng cáo). Hub không thu thập tên hay thông tin liên hệ của bạn.' },
  ],

  disclaimer: 'Nội dung dịch vụ, giá cước và ngôn ngữ hỗ trợ có thể thay đổi tùy theo từng dịch vụ. Vui lòng xác nhận điều kiện cuối cùng trên từng dịch vụ.',
};
