-- ============================================================================
-- LINGOLY - SEED DATA (IDEMPOTENT)
-- Dữ liệu mẫu này đã được tích hợp sẵn ở cuối file supabase/schema.sql.
-- Bạn chỉ cần chạy file này nếu muốn nạp lại dữ liệu mẫu riêng lẻ.
-- ============================================================================

insert into public.vocabulary_words (word, meaning, word_type, pronunciation, example)
values
  ('consistent', 'kiên trì, nhất quán', 'adjective', '/kənˈsɪstənt/', 'Small, consistent steps make a big difference.'),
  ('improve', 'cải thiện', 'verb', '/ɪmˈpruːv/', 'I want to improve my pronunciation.'),
  ('habit', 'thói quen', 'noun', '/ˈhæbɪt/', 'Reading is a good habit for learners.'),
  ('practice', 'luyện tập', 'verb', '/ˈpræktɪs/', 'Practice a little every day.'),
  ('confident', 'tự tin', 'adjective', '/ˈkɒnfɪdənt/', 'She feels more confident when she speaks.'),
  ('morning', 'buổi sáng', 'noun', '/ˈmɔːnɪŋ/', 'I drink coffee every morning.'),
  ('schedule', 'lịch trình', 'noun', '/ˈʃedjuːl/', 'My schedule is busy on Monday.'),
  ('journey', 'hành trình', 'noun', '/ˈdʒɜːni/', 'The train journey takes two hours.'),
  ('delicious', 'ngon miệng', 'adjective', '/dɪˈlɪʃəs/', 'This noodle soup is delicious.'),
  ('patient', 'kiên nhẫn', 'adjective', '/ˈpeɪʃnt/', 'Be patient with yourself when learning.')
on conflict (word) do nothing;

insert into public.lessons (title, subtitle, category, sort_order)
select seed.title, seed.subtitle, seed.category, seed.sort_order
from (values
  ('Động từ to be: am, is, are', 'Giới thiệu bản thân và mô tả người, vật.', 'Ngữ pháp · A1', 1),
  ('Present simple: thói quen và sự thật', 'Nói về thói quen, lịch trình và sự thật hiển nhiên.', 'Ngữ pháp · A1', 2),
  ('Mạo từ a, an, the', 'Chọn đúng mạo từ trước danh từ.', 'Ngữ pháp · A1', 3),
  ('Danh từ số nhiều', 'Quy tắc thêm -s, -es và các dạng bất quy tắc.', 'Ngữ pháp · A1', 4),
  ('Present continuous: đang xảy ra', 'Diễn tả việc đang diễn ra ngay lúc nói.', 'Ngữ pháp · A2', 5),
  ('Past simple: chuyện đã qua', 'Kể lại việc đã xảy ra và kết thúc trong quá khứ.', 'Ngữ pháp · A2', 6),
  ('There is và there are', 'Nói về sự tồn tại của người, vật.', 'Ngữ pháp · A1', 7),
  ('Can và can’t: khả năng', 'Nói về điều bạn có thể hoặc không thể làm.', 'Ngữ pháp · A1', 8),
  ('Giới từ in, on, at', 'Chỉ thời gian và nơi chốn.', 'Ngữ pháp · A2', 9),
  ('Từ để hỏi: what, where, when, why, how', 'Đặt câu hỏi để lấy thông tin.', 'Ngữ pháp · A1', 10)
) as seed(title, subtitle, category, sort_order)
where not exists (
  select 1 from public.lessons existing where existing.title = seed.title
);
