/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AudioItem {
  key: string;
  url: string;
  text: string;
}

// Set of audio files verified and downloaded directly into /public/audio/
export const DOWNLOADED_AUDIO_KEYS = new Set<string>([
  'intro',
  'signal1',
  'signal1_correct',
  'signal1_caution',
  'signal2',
  'signal2_refusal_ready',
  'signal2_correct',
  'signal3'
]);

export const AUDIO_MANIFEST: Record<string, AudioItem> = {
  intro: {
    key: 'intro',
    url: '/audio/intro.wav',
    text: 'Hôm nay, nhiệm vụ của các em không phải là đoán tên một loại ma túy. Nhiệm vụ khó hơn nhiều. Khi một nguy cơ xuất hiện nhưng không mang biển báo nguy hiểm, liệu các em có đủ bình tĩnh để nhận ra và đưa ra quyết định an toàn? Phòng điều khiển đang nhận được sáu tín hiệu. Hãy cùng xử lý từng tín hiệu để thu thập các mảnh lời giải.'
  },
  signal1: {
    key: 'signal1',
    url: '/audio/signal1.wav',
    text: 'Tín hiệu số 1. Món quà miễn phí cổng trường. Hãy phân biệt rõ đâu là dữ kiện thực tế và đâu là điều chưa thể kết luận.'
  },
  signal1_correct: {
    key: 'signal1_correct',
    url: '/audio/signal1_correct.wav',
    text: 'Phân loại hoặc nhận diện chính xác! Em đã phân biệt rất sắc bén giữa dữ kiện thực tế và điều chưa thể kết luận. Bây giờ, hãy đưa ra quyết định an toàn.'
  },
  signal1_caution: {
    key: 'signal1_caution',
    url: '/audio/signal1_caution.wav',
    text: 'Chưa hoàn toàn chính xác. Hãy nhớ rằng: những gì quan sát trực tiếp là dữ kiện; còn quy kết người lạ là tội phạm hoặc chai nước chứa ma túy khi chưa kiểm nghiệm chỉ là suy đoán.'
  },
  signal2: {
    key: 'signal2',
    url: '/audio/signal2.wav',
    text: 'Tín hiệu số 2. Máy đo áp lực đồng trang lứa. Hãy nhận diện các câu gây sức ép, tự lập lời từ chối ngắn và xác định nơi sẽ rời đến.'
  },
  signal2_refusal_ready: {
    key: 'signal2_refusal_ready',
    url: '/audio/signal2_refusal_ready.wav',
    text: 'Đã nhận diện đủ 4 câu gây sức ép. Hãy tạo lời từ chối ngắn, dứt khoát và chỉ rõ nơi em sẽ rời đến.'
  },
  signal2_correct: {
    key: 'signal2_correct',
    url: '/audio/signal2_correct.wav',
    text: 'Phân loại hoặc nhận diện chính xác! Lời từ chối dứt khoát kết hợp rời ngay đến nơi an toàn là lá chắn tự vệ hữu hiệu nhất.'
  },
  signal3: {
    key: 'signal3',
    url: '/audio/signal3.wav',
    text: 'Tín hiệu số 3. Lời nhờ giữ hộ gói đồ bí mật. Nhận diện 3 dấu hiệu cảnh giác trước khi đưa ra quyết định an toàn.'
  },
  signal3_flags_done: {
    key: 'signal3_flags_done',
    url: '/audio/signal3_flags_done.wav',
    text: 'Cả 3 dấu hiệu cảnh giác đều xuất hiện. Em hãy chọn phương án an toàn nhất.'
  },
  signal3_correct: {
    key: 'signal3_correct',
    url: '/audio/signal3_correct.wav',
    text: 'Phân loại hoặc nhận diện chính xác! Em không cần phải mở hay kiểm tra vật phẩm; không nhận, không giữ hộ và rời đi là lựa chọn an toàn tuyệt đối.'
  },
  signal4: {
    key: 'signal4',
    url: '/audio/signal4.wav',
    text: 'Tín hiệu số 4. Bạn đang cầu cứu nhưng lại xin giữ bí mật. Hãy viết lời hồi đáp và chọn người lớn tin cậy để bảo vệ bạn.'
  },
  signal4_correct: {
    key: 'signal4_correct',
    url: '/audio/signal4_correct.wav',
    text: 'Phân loại hoặc nhận diện chính xác! Bảo vệ bạn không phải là che giấu mù quáng. Tìm người lớn đáng tin cậy chính là cách bảo vệ bạn.'
  },
  signal5: {
    key: 'signal5',
    url: '/audio/signal5.wav',
    text: 'Tín hiệu số 5. Dấu hiệu bất thường không đồng nghĩa với tội lỗi. Hãy tỉnh táo phân biệt dữ kiện và suy đoán, ngăn chặn tin đồn và tìm người hỗ trợ cho bạn.'
  },
  signal5_classified_done: {
    key: 'signal5_classified_done',
    url: '/audio/signal5_classified_done.wav',
    text: 'Dấu hiệu bất thường không phải bằng chứng. Tuyệt đối không gán nhãn, không lan truyền tin đồn. Hãy chọn hành động hỗ trợ đúng đắn.'
  },
  signal6: {
    key: 'signal6',
    url: '/audio/signal6.wav',
    text: 'Tín hiệu số 6. Vật lạ trong khuôn viên trường. Hãy giữ khoảng cách an toàn, không chạm vào và hoàn thành lời báo tin đủ 4 yếu tố.'
  },
  signal6_correct: {
    key: 'signal6_correct',
    url: '/audio/signal6_correct.wav',
    text: 'Phân loại hoặc nhận diện chính xác! Giữ khoảng cách an toàn, không chạm vào và báo tin ngay cho người có trách nhiệm.'
  },
  card_d: {
    key: 'card_d',
    url: '/audio/card_d.wav',
    text: 'Tình huống khẩn cấp Thẻ D. Khi không thể rời đi theo lối cũ và bị đe dọa, hãy ưu tiên an toàn thân thể, tìm cách thoát ra nơi có người và gọi hỗ trợ khẩn cấp.'
  },
  dossier: {
    key: 'dossier',
    url: '/audio/dossier.wav',
    text: '06 trên 06 tín hiệu đã được xử lý. Hồ sơ lời giải đã thu thập đủ sáu mảnh. Các em hãy cùng thảo luận để tự sắp xếp thành quy trình hành động an toàn.'
  },
  grand_challenge: {
    key: 'grand_challenge',
    url: '/audio/grand_challenge.wav',
    text: 'Thử thách tổng hợp: 5 phút quyết định tương lai. Tại buổi tụ tập, khi đối mặt nhiều sức ép cùng lúc, hãy vận dụng các mảnh lời giải để ra quyết định an toàn.'
  },
  cipher: {
    key: 'cipher',
    url: '/audio/cipher.wav',
    text: 'Mật mã an toàn đã được giải! Dừng lại. Từ chối. Rời khỏi. Tìm người đáng tin cậy. Và báo tin khi cần thiết. Sức khỏe bất thường hoặc đe dọa trước mắt: ưu tiên đến nơi an toàn và tìm hỗ trợ y tế ngay, không chờ đi đủ từng bước.'
  },
  results: {
    key: 'results',
    url: '/audio/results.wav',
    text: 'Hồ sơ năng lực an toàn học đường của em. Hệ thống ghi nhận các kỹ năng đã được luyện tập và những nội dung cần tiếp tục rèn giũa.'
  }
};

// Quick helper to find audio item by text or key
export function findAudioItem(textOrKey: string): AudioItem | null {
  if (AUDIO_MANIFEST[textOrKey]) {
    return AUDIO_MANIFEST[textOrKey];
  }
  const normalized = textOrKey.trim().toLowerCase();
  for (const item of Object.values(AUDIO_MANIFEST)) {
    const itemNorm = item.text.toLowerCase();
    if (
      itemNorm === normalized ||
      itemNorm.startsWith(normalized.slice(0, 25)) ||
      normalized.startsWith(itemNorm.slice(0, 25)) ||
      itemNorm.includes(normalized.slice(0, 25)) ||
      normalized.includes(itemNorm.slice(0, 25))
    ) {
      return item;
    }
  }
  return null;
}
