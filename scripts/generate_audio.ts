/**
 * Script to pre-generate and download all narration audio files
 * to /public/audio/ so they are saved directly in the project codebase.
 */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('No GEMINI_API_KEY found in environment');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const AUDIO_ITEMS: Record<string, string> = {
  intro:
    'Hôm nay, nhiệm vụ của các em không phải là đoán tên một loại ma túy. Nhiệm vụ khó hơn nhiều. Khi một nguy cơ xuất hiện nhưng không mang biển báo nguy hiểm, liệu các em có đủ bình tĩnh để nhận ra và đưa ra quyết định an toàn? Phòng điều khiển đang nhận được sáu tín hiệu. Hãy cùng xử lý từng tín hiệu để thu thập các mảnh lời giải.',
  signal1:
    'Tín hiệu số 1. Món quà miễn phí cổng trường. Hãy phân biệt rõ đâu là dữ kiện thực tế và đâu là điều chưa thể kết luận.',
  signal1_correct:
    'Phân loại hoặc nhận diện chính xác! Em đã phân biệt rất sắc bén giữa dữ kiện thực tế và điều chưa thể kết luận. Bây giờ, hãy đưa ra quyết định an toàn.',
  signal1_caution:
    'Chưa hoàn toàn chính xác. Hãy nhớ rằng: những gì quan sát trực tiếp là dữ kiện; còn quy kết người lạ là tội phạm hoặc chai nước chứa ma túy khi chưa kiểm nghiệm chỉ là suy đoán.',
  signal2:
    'Tín hiệu số 2. Máy đo áp lực đồng trang lứa. Hãy nhận diện các câu gây sức ép, tự lập lời từ chối ngắn và xác định nơi sẽ rời đến.',
  signal2_refusal_ready:
    'Đã nhận diện đủ 4 câu gây sức ép. Hãy tạo lời từ chối ngắn, dứt khoát và chỉ rõ nơi em sẽ rời đến.',
  signal2_correct:
    'Phân loại hoặc nhận diện chính xác! Lời từ chối dứt khoát kết hợp rời ngay đến nơi an toàn là lá chắn tự vệ hữu hiệu nhất.',
  signal3:
    'Tín hiệu số 3. Lời nhờ giữ hộ gói đồ bí mật. Nhận diện 3 dấu hiệu cảnh giác trước khi đưa ra quyết định an toàn.',
  signal3_flags_done:
    'Cả 3 dấu hiệu cảnh giác đều xuất hiện. Em hãy chọn phương án an toàn nhất.',
  signal3_correct:
    'Phân loại hoặc nhận diện chính xác! Em không cần phải mở hay kiểm tra vật phẩm; không nhận, không giữ hộ và rời đi là lựa chọn an toàn tuyệt đối.',
  signal4:
    'Tín hiệu số 4. Bạn đang cầu cứu nhưng lại xin giữ bí mật. Hãy viết lời hồi đáp và chọn người lớn tin cậy để bảo vệ bạn.',
  signal4_correct:
    'Phân loại hoặc nhận diện chính xác! Bảo vệ bạn không phải là che giấu mù quáng. Tìm người lớn đáng tin cậy chính là cách bảo vệ bạn.',
  signal5:
    'Tín hiệu số 5. Dấu hiệu bất thường không đồng nghĩa với tội lỗi. Hãy tỉnh táo phân biệt dữ kiện và suy đoán, ngăn chặn tin đồn và tìm người hỗ trợ cho bạn.',
  signal5_classified_done:
    'Dấu hiệu bất thường không phải bằng chứng. Tuyệt đối không gán nhãn, không lan truyền tin đồn. Hãy chọn hành động hỗ trợ đúng đắn.',
  signal6:
    'Tín hiệu số 6. Vật lạ trong khuôn viên trường. Hãy giữ khoảng cách an toàn, không chạm vào và hoàn thành lời báo tin đủ 4 yếu tố.',
  signal6_correct:
    'Phân loại hoặc nhận diện chính xác! Giữ khoảng cách an toàn, không chạm vào và báo tin ngay cho người có trách nhiệm.',
  card_d:
    'Tình huống khẩn cấp Thẻ D. Khi không thể rời đi theo lối cũ và bị đe dọa, hãy ưu tiên an toàn thân thể, tìm cách thoát ra nơi có người và gọi hỗ trợ khẩn cấp.',
  dossier:
    '06 trên 06 tín hiệu đã được xử lý. Hồ sơ lời giải đã thu thập đủ sáu mảnh. Các em hãy cùng thảo luận để tự sắp xếp thành quy trình hành động an toàn.',
  grand_challenge:
    'Thử thách tổng hợp: 5 phút quyết định tương lai. Tại buổi tụ tập, khi đối mặt nhiều sức ép cùng lúc, hãy vận dụng các mảnh lời giải để ra quyết định an toàn.',
  cipher:
    'Mật mã an toàn đã được giải! Dừng lại. Từ chối. Rời khỏi. Tìm người đáng tin cậy. Và báo tin khi cần thiết. Sức khỏe bất thường hoặc đe dọa trước mắt: ưu tiên đến nơi an toàn và tìm hỗ trợ y tế ngay, không chờ đi đủ từng bước.',
  results:
    'Hồ sơ năng lực an toàn học đường của em. Hệ thống ghi nhận các kỹ năng đã được luyện tập và những nội dung cần tiếp tục rèn giũa.'
};

function pcmToWavBuffer(pcm16: Int16Array, sampleRate = 24000): Buffer {
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = pcm16.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < pcm16.length; i++, offset += 2) {
    buffer.writeInt16LE(pcm16[i], offset);
  }
  return buffer;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateAll() {
  const outputDir = path.resolve(process.cwd(), 'public', 'audio');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const manifestPath = path.join(outputDir, 'manifest.json');
  let manifest: Record<string, { path: string; text: string }> = {};
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {}
  }

  for (const [key, text] of Object.entries(AUDIO_ITEMS)) {
    const targetFile = path.join(outputDir, `${key}.wav`);

    // Skip if already generated
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 1000) {
      console.log(`[SKIP] Already exists: ${key}.wav`);
      manifest[key] = { path: `/audio/${key}.wav`, text };
      continue;
    }

    console.log(`Generating audio for [${key}]...`);

    const promptText = `Nói bằng giọng nữ miền Bắc chuẩn tiếng Việt, tự nhiên, bình tĩnh, truyền cảm: ${text}`;
    let success = false;
    let attempts = 0;

    while (!success && attempts < 5) {
      attempts++;
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-preview-tts',
          contents: [{ parts: [{ text: promptText }] }],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Aoede'
                }
              }
            }
          }
        });

        const part = response?.candidates?.[0]?.content?.parts?.[0];
        const audioBase64 = part?.inlineData?.data;
        const mimeType = part?.inlineData?.mimeType || 'audio/L16;rate=24000';

        if (!audioBase64) {
          console.error(`Failed to get audio data for ${key}`);
          break;
        }

        let sampleRate = 24000;
        const rateMatch = mimeType.match(/rate=(\d+)/);
        if (rateMatch && rateMatch[1]) {
          sampleRate = parseInt(rateMatch[1], 10);
        }

        const pcmBuffer = Buffer.from(audioBase64, 'base64');
        const pcm16 = new Int16Array(
          pcmBuffer.buffer,
          pcmBuffer.byteOffset,
          pcmBuffer.length / 2
        );
        const wavBuffer = pcmToWavBuffer(pcm16, sampleRate);
        fs.writeFileSync(targetFile, wavBuffer);
        manifest[key] = { path: `/audio/${key}.wav`, text };
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log(`Saved ${targetFile} (${wavBuffer.length} bytes)`);
        success = true;

        // Respect free-tier rate limits (3 requests per minute = ~21s pause)
        console.log('Pausing 21 seconds to stay well within free tier rate limit...');
        await sleep(21000);
      } catch (err: any) {
        console.error(`Attempt ${attempts} error for ${key}:`, err?.message || err);
        console.log('Rate limit reached. Waiting 35 seconds before retry...');
        await sleep(35000);
      }
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('All audio items processed!');
}

generateAll();
