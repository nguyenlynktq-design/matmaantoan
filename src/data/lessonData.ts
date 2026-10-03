/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SolutionPiece {
  id: string;
  signalId: number;
  title: string;
  suggestedText: string;
  detailText: string;
}

export const SOLUTION_PIECES: SolutionPiece[] = [
  {
    id: 'piece_01',
    signalId: 1,
    title: 'Mảnh Lời Giải 01',
    suggestedText: 'Dừng lại để xét dữ kiện',
    detailText: 'Khi tình huống bất thường, lập tức dừng lại, chỉ dựa vào sự thật quan sát được, không vội suy đoán.'
  },
  {
    id: 'piece_02',
    signalId: 2,
    title: 'Mảnh Lời Giải 02',
    suggestedText: 'Nhận ra sức ép và nói lời từ chối',
    detailText: 'Phát hiện sự lôi kéo đồng trang lứa; lập lời từ chối ngắn, rõ ràng và xác định ngay nơi sẽ rời đến.'
  },
  {
    id: 'piece_03',
    signalId: 3,
    title: 'Mảnh Lời Giải 03',
    suggestedText: 'Không nhận, không giữ và tìm lối rời',
    detailText: 'Nhận diện 3 dấu hiệu rủi ro cao; kiên quyết không cầm hộ đồ vật không rõ nguồn gốc và rời khỏi khu vực.'
  },
  {
    id: 'piece_04',
    signalId: 4,
    title: 'Mảnh Lời Giải 04',
    suggestedText: 'Tìm người lớn tin cậy khi bạn cần giúp',
    detailText: 'Bảo vệ bạn bằng cách tìm người lớn có trách nhiệm; không giữ bí mật mù quáng khi an toàn bị đe dọa.'
  },
  {
    id: 'piece_05',
    signalId: 5,
    title: 'Mảnh Lời Giải 05',
    suggestedText: 'Không gán nhãn; quan tâm và tìm hỗ trợ cho bạn',
    detailText: 'Biểu hiện bất thường không phải bằng chứng; không cô lập, không lan truyền tin đồn; kết nối tư vấn học đường và y tế.'
  },
  {
    id: 'piece_06',
    signalId: 6,
    title: 'Mảnh Lời Giải 06',
    suggestedText: 'Giữ khoảng cách; báo đúng người, đúng sự việc',
    detailText: 'Không chạm vào vật lạ; giữ khoảng cách an toàn; báo rõ thời gian, vị trí, điều trực tiếp thấy cho người phụ trách.'
  }
];

export const SIGNALS_DATA = [
  {
    id: 1,
    code: 'TÍN HIỆU 01',
    title: 'MÓN QUÀ MIỄN PHÍ',
    subtitle: 'Hoạt động 1 · 8 phút · Cổng trường sau giờ học',
    contextText: 'Sau giờ tan trường, một người lạ đứng ngoài cổng phát chai đồ uống và nói: "Anh chị đang quảng cáo sản phẩm mới ra mắt. Uống thử hoàn toàn miễn phí nhé!".',
    voiceText: 'Tín hiệu số 1. Món quà miễn phí cổng trường. Hãy phân biệt rõ đâu là dữ kiện thực tế và đâu là điều chưa thể kết luận.',
    skillFocus: 'Dữ kiện thực tế vs Điều chưa thể kết luận',
    task1: {
      cards: [
        { id: 'c1', text: 'Người này đứng ở ngoài cổng trường', category: 'fact' as const },
        { id: 'c2', text: 'Sản phẩm được phát tặng miễn phí', category: 'fact' as const },
        { id: 'c3', text: 'Em chưa biết rõ nguồn gốc và xuất xứ sản phẩm', category: 'fact' as const },
        { id: 'c4', text: 'Người này chắc chắn là tội phạm', category: 'speculation' as const },
        { id: 'c5', text: 'Chai nước chắc chắn chứa ma túy', category: 'speculation' as const }
      ]
    },
    task2: {
      options: [
        { text: 'Nhận vì là quà miễn phí, không mất tiền', safe: false, reason: 'Chưa an toàn! Tuyệt đối không tiêu thụ đồ uống không rõ nguồn gốc từ người lạ.' },
        { text: 'Cầm về hỏi bạn bè xem ai biết không', safe: false, reason: 'Chưa an toàn! Cầm theo vật thể lạ có thể gây thêm rủi ro cho chính em và bạn bè.' },
        { text: 'Lịch sự từ chối, không nhận, không thử và rời đi', safe: true, reason: 'Hoàn toàn chính xác! Không nhận, không thử và rời khỏi khu vực đó là hành động tự bảo vệ đúng đắn nhất.' },
        { text: 'Mở thử nắp ngửi mùi để tự kiểm tra', safe: false, reason: 'Cực kỳ nguy hiểm! Học sinh tuyệt đối không nếm, ngửi hay mở vật phẩm lạ để tự kiểm tra.' }
      ]
    }
  },
  {
    id: 2,
    code: 'TÍN HIỆU 02',
    title: '“THỬ MỘT LẦN THÔI”',
    subtitle: 'Hoạt động 2 · Nhóm bạn sau giờ học',
    contextText: 'Một bạn trong nhóm đưa món đồ lạ, nói: "Thử cái này đi. Một lần thôi mà. Ai cũng thử rồi, không thử thì nhát lắm!".',
    voiceText: 'Tín hiệu số 2. Máy đo áp lực đồng trang lứa. Hãy nhận diện các câu gây sức ép, tự lập lời từ chối ngắn và xác định nơi sẽ rời đến.',
    skillFocus: 'Nhận diện sức ép nhóm & Kỹ năng Từ chối + Rời đi',
    pressurePhrases: [
      { text: '“Ai cũng thử rồi.”', type: 'FOMO & Lôi kéo đám đông' },
      { text: '“Có một lần thôi.”', type: 'Hạ thấp nguy cơ' },
      { text: '“Không thử thì nhát lắm!”', type: 'Công kích bản lĩnh' },
      { text: '“Không sao đâu.”', type: 'Cam kết vô căn cứ' }
    ],
    refusalChips: [
      'Không.',
      'Mình không dùng',
      'thứ không rõ nguồn gốc.',
      'Mình phải về nhà ngay.',
      'Mình đi sang phòng thư viện đây.',
      'Cảm ơn nhưng mình không tham gia.'
    ]
  },
  {
    id: 3,
    code: 'TÍN HIỆU 03',
    title: '“GIỮ HỘ MÌNH”',
    subtitle: 'Hoạt động 2 (tiếp) · Hành lang lớp học',
    contextText: 'Ở hành lang, một bạn đưa gói đồ bọc kín, nói: "Cầm hộ mình một lúc nhé. Đừng mở ra và tuyệt đối đừng nói với ai đấy. Không tin mình à?".',
    voiceText: 'Tín hiệu số 3. Lời nhờ giữ hộ gói đồ bí mật. Nhận diện 3 dấu hiệu cảnh giác trước khi đưa ra quyết định an toàn.',
    skillFocus: '3 dấu hiệu rủi ro cao & Ranh giới an toàn',
    redFlags: [
      { text: 'Không biết rõ bên trong gói đồ chứa gì', icon: '❓' },
      { text: 'Bị nhờ giữ hộ và phải chịu trách nhiệm thay người khác', icon: '📦' },
      { text: 'Bị yêu cầu giữ bí mật tuyệt đối, kèm câu ép tâm lý "Không tin mình à?"', icon: '🔒' }
    ],
    options: [
      { text: 'A. Cầm giúp vì là bạn thân, từ chối sợ mất lòng', safe: false, reason: 'Rất nguy hiểm! Nếu gói đồ chứa vật phẩm cấm hoặc nguy hại, em sẽ phải chịu liên đới pháp lý và kỷ luật nặng nề.' },
      { text: 'B. Không nhận và không giữ hộ; nói câu từ chối và tìm lối rời khỏi tình huống', safe: true, reason: 'Chính xác! Em không cần phải tự mở hoặc kiểm tra vật phẩm. Lựa chọn an toàn là kiên quyết không nhận, không giữ và rời đi.' },
      { text: 'C. Nhận rồi giấu kỹ dưới đáy cặp sách', safe: false, reason: 'Rủi ro cực lớn! Việc che giấu vật lạ khiến em trở thành người trực tiếp chịu trách nhiệm trước nhà trường và pháp luật.' },
      { text: 'D. Tò mò lén mở ra để xem bạn giấu cái gì', safe: false, reason: 'Tuyệt đối không! Việc mở hoặc kiểm tra gói đồ lạ có thể gây nhiễm độc hoặc làm hỏng hiện trường an toàn.' }
    ]
  },
  {
    id: 4,
    code: 'TÍN HIỆU 04',
    title: '“ĐỪNG NÓI VỚI AI”',
    subtitle: 'Hoạt động 3 · 12 phút · Tin nhắn bạn cùng khối',
    contextText: 'Một bạn cùng khối nhắn tin riêng: "Cậu ơi… mình đang sợ quá. Mấy hôm nay có mấy anh lớn cứ ép mình phải thử cái gói gì đó… Nhưng cậu hứa với mình là giữ kín nhé, đừng mách ai, họ dọa đánh mình đấy 😭".',
    voiceText: 'Tín hiệu số 4. Bạn đang cầu cứu nhưng lại xin giữ bí mật. Hãy viết lời hồi đáp và chọn người lớn tin cậy để bảo vệ bạn.',
    skillFocus: 'Bí mật nguy hại vs Tìm người lớn tin cậy',
    chatLog: [
      { sender: 'Bạn', text: 'Cậu ơi… mình đang sợ quá.' },
      { sender: 'Bạn', text: 'Mấy hôm nay có mấy anh lớn cứ ép mình phải thử cái gói gì đó…' },
      { sender: 'Bạn', text: 'Nhưng cậu hứa với mình là giữ kín nhé, đừng mách ai, họ dọa đánh mình đấy 😭' }
    ],
    adultOptions: [
      { id: 'gvcn', name: 'Thầy Cô Giáo Chủ Nhiệm', role: 'Được đào tạo để bảo vệ học sinh và giữ kín danh tính', correct: true },
      { id: 'bve', name: 'Thầy Cô Trực Trường / Bác Bảo Vệ', role: 'Có mặt ngay tại hiện trường để ngăn chặn kịp thời các đối tượng đe dọa', correct: true },
      { id: 'pme', name: 'Cha Mẹ / Người Chăm Sóc Đáng Tin Cậy', role: 'Chỗ dựa an toàn, có thẩm quyền pháp lý bảo vệ em và bạn', correct: true },
      { id: 'tuvan', name: 'Phòng Tư Vấn Học Đường / Y Tế', role: 'Có chuyên môn hỗ trợ tâm lý và quy trình bảo vệ học sinh', correct: true },
      { id: 'imlang', name: 'Im lặng giữ bí mật vì đã lỡ hứa với bạn', role: 'Để bạn tiếp tục bị đe dọa và đẩy bạn vào nguy cơ lớn hơn', correct: false },
      { id: 'doichat', name: 'Rủ nhóm bạn tự đi gặp các anh lớn để đối chất', role: 'Cực kỳ nguy hiểm! Học sinh không tự ý đối đầu với kẻ đe dọa', correct: false }
    ]
  },
  {
    id: 5,
    code: 'TÍN HIỆU 05',
    title: 'BẠN ĐANG GẶP CHUYỆN',
    subtitle: 'Hoạt động 4 · 23 phút · Quan sát hành vi học đường',
    contextText: 'Một bạn gần đây thường xuyên mệt mỏi, ít nói và kết quả học tập sa sút. Vài bạn xì xào: "Bạn ấy chắc chắn nghiện ma túy rồi!" và rủ mọi người tránh xa.',
    voiceText: 'Tín hiệu số 5. Dấu hiệu bất thường không đồng nghĩa với tội lỗi. Hãy tỉnh táo phân biệt dữ kiện và suy đoán, ngăn chặn tin đồn và tìm người hỗ trợ cho bạn.',
    skillFocus: 'Không gán nhãn & Thấu cảm & Tìm hỗ trợ chuyên môn',
    sortingItems: [
      { id: 's1', text: 'Bạn thường xuyên mệt mỏi trên lớp', type: 'fact' as const },
      { id: 's2', text: 'Bạn ít nói hơn trước đây', type: 'fact' as const },
      { id: 's3', text: 'Kết quả học tập đợt này sa sút', type: 'fact' as const },
      { id: 's4', text: '“Bạn ấy chắc chắn nghiện ma túy rồi!”', type: 'speculation' as const },
      { id: 's5', text: '“Cần phải tẩy chay và cô lập bạn ấy ngay”', type: 'speculation' as const }
    ],
    actionOptions: [
      { text: 'Đăng lên nhóm lớp để cảnh báo mọi người tẩy chay', safe: false, reason: 'Vi phạm nghiêm trọng! Lan truyền tin đồn thất thiệt làm tổn thương danh dự bạn và gây chia rẽ học đường.' },
      { text: 'Ngăn bạn bè đồn đoán; hỏi han riêng nhẹ nhàng và báo riêng những điều thấy cho GVCN / Phòng tư vấn / Y tế', safe: true, reason: 'Hoàn toàn chính xác! Không gán nhãn, không cô lập, bảo mật thông tin và tìm sự trợ giúp chuyên môn cho bạn.' },
      { text: 'Tự lập nhóm thám tử đi rình mò, theo dõi nhà bạn để tìm bằng chứng', safe: false, reason: 'Không phù hợp! Học sinh không tự ý điều tra hoặc theo dõi đời sống cá nhân của bạn.' },
      { text: 'Im lặng coi như không liên quan đến mình', safe: false, reason: 'Chưa thể hiện tinh thần sẻ chia. Khi bạn có biểu hiện sa sút, bạn rất cần sự kết nối an toàn từ thầy cô.' }
    ]
  },
  {
    id: 6,
    code: 'TÍN HIỆU 06',
    title: 'VẬT LẠ TRONG KHUÔN VIÊN',
    subtitle: 'Hoạt động 5 · 12 phút · Giờ ra chơi tại góc sân bóng',
    contextText: 'Trong giờ ra chơi, em và bạn thấy một gói đồ không có nhãn mác ở góc khuất sân bóng; bạn định nhặt lên xem.',
    voiceText: 'Tín hiệu số 6. Vật lạ trong khuôn viên trường. Hãy giữ khoảng cách an toàn, không chạm vào và hoàn thành lời báo tin đủ 4 yếu tố.',
    skillFocus: 'Nguyên tắc hiện trường & Kỹ năng Báo tin 4 yếu tố',
    actionOptions: [
      { text: 'A. Cùng bạn cúi xuống nhặt lên mở ra xem là gì', safe: false, reason: 'Rất nguy hiểm! Vật thể lạ có thể chứa hóa chất ăn mòn, chất độc hoặc chất cấm nguy hại.' },
      { text: 'B. Nhặt đem về nộp ngay cho lớp trưởng', safe: false, reason: 'Chưa tối ưu! Tuyệt đối không tự ý di dời vật thể lạ. Cần giữ nguyên hiện trường an toàn.' },
      { text: 'C. Chụp ảnh đăng lên mạng xã hội để hỏi ý kiến cộng đồng', safe: false, reason: 'Không an toàn! Gây hoang mang không cần thiết và thu hút đám đông tò mò đến hiện trường.' },
      { text: 'D. Cản bạn lại, giữ khoảng cách an toàn, không chạm vào và lập tức báo giáo viên trực hoặc bác bảo vệ', safe: true, reason: 'Hoàn hảo! Đây là nguyên tắc chuẩn: Không chạm · Giữ khoảng cách · Báo người có thẩm quyền.' }
    ],
    reportElements: [
      { type: 'time', label: '1. Thời gian', example: 'Lúc giờ ra chơi' },
      { type: 'place', label: '2. Nơi thấy', example: 'Góc khuất sân bóng trường' },
      { type: 'observation', label: '3. Điều trực tiếp thấy', example: 'Một gói đồ không có nhãn mác, bạn định nhặt' },
      { type: 'recipient', label: '4. Người em đang báo', example: 'Thưa Thầy/Cô trực ban hoặc Bác bảo vệ' }
    ]
  }
];

export const CARD_D_DATA = {
  title: 'THẺ D – TÌNH HUỐNG KHÔNG THỂ RỜI ĐI / GỌI HỖ TRỢ KHẨN CẤP',
  badge: 'NHÁNH THỰC HÀNH DIỄN TẬP KHẨN CẤP',
  scenario: 'Trên đường đi học về qua một con hẻm vắng, hai người lạ chặn lối, dúi cho em một gói đồ và ép mang ra quán đầu ngõ, kèm lời đe dọa. Em không thể đi tiếp theo lối cũ.',
  voiceText: 'Tình huống khẩn cấp Thẻ D. Khi không thể rời đi theo lối cũ và bị đe dọa, hãy ưu tiên an toàn thân thể, tìm cách thoát ra nơi có người và gọi hỗ trợ khẩn cấp.',
  coreRule: 'Không giằng co, không tranh cãi hoặc đối đầu; tìm cách lùi ra và đến nơi có người, gọi người lớn hoặc kêu cứu khi phù hợp. Không buộc học sinh phải hoàn thành tuần tự năm bước khi đang bị đe dọa.',
  hotlines: [
    { number: '113', name: 'Cảnh sát phản ứng nhanh', usage: 'Khi bị đe dọa, bị chặn đường, cần công an can thiệp khẩn cấp' },
    { number: '115', name: 'Cấp cứu Y tế', usage: 'Khi có người bị ngất, co giật, thương tích hoặc cần cấp cứu sức khỏe' },
    { number: '111', name: 'Tổng đài Quốc gia Bảo vệ Trẻ em', usage: 'Tư vấn, hỗ trợ khẩn cấp 24/7 và can thiệp bảo vệ trẻ vị thành niên' }
  ]
};
