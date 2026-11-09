const q = (question, options, answer, explain) => ({ question, options, answer, explain })

export const lessons = [
  {
    id: 'to-be',
    title: 'Động từ to be: am, is, are',
    category: 'Ngữ pháp',
    level: 'A1',
    minutes: 10,
    summary: 'Giới thiệu bản thân và mô tả người, vật.',
    sections: [
      {
        heading: 'Cách chia',
        body: 'I đi với am. He, she, it đi với is. You, we, they đi với are. Dạng phủ định thêm not sau động từ: I am not, she is not (isn’t), they are not (aren’t).',
        examples: [
          ['I am a student.', 'Tôi là học sinh.'],
          ['She is from Hanoi.', 'Cô ấy đến từ Hà Nội.'],
          ['They are not at home.', 'Họ không ở nhà.'],
        ],
      },
      {
        heading: 'Câu hỏi',
        body: 'Đảo động từ to be lên trước chủ ngữ để đặt câu hỏi Yes/No.',
        examples: [
          ['Are you ready?', 'Bạn sẵn sàng chưa?'],
          ['Is he your brother?', 'Anh ấy là anh trai bạn à?'],
        ],
      },
    ],
    quiz: [
      q('She ___ a teacher.', ['am', 'is', 'are', 'be'], 1, 'Với she dùng is.'),
      q('We ___ at school now.', ['is', 'am', 'are', 'be'], 2, 'Với we dùng are.'),
      q('I ___ not hungry.', ['am', 'is', 'are', 'do'], 0, 'Với I dùng am.'),
      q('___ they your friends?', ['Is', 'Am', 'Are', 'Do'], 2, 'They đi với are, đảo lên đầu câu hỏi.'),
      q('Chọn câu đúng.', ['He are tall.', 'He is tall.', 'He am tall.', 'He be tall.'], 1, 'He đi với is.'),
    ],
  },
  {
    id: 'present-simple',
    title: 'Present simple: thói quen và sự thật',
    category: 'Ngữ pháp',
    level: 'A1',
    minutes: 12,
    summary: 'Nói về thói quen, lịch trình và sự thật hiển nhiên.',
    sections: [
      {
        heading: 'Khẳng định',
        body: 'Dùng động từ nguyên mẫu. Với he, she, it thêm -s hoặc -es (go thành goes, study thành studies).',
        examples: [
          ['I work every day.', 'Tôi làm việc mỗi ngày.'],
          ['She studies English every morning.', 'Cô ấy học tiếng Anh mỗi sáng.'],
        ],
      },
      {
        heading: 'Phủ định và câu hỏi',
        body: 'Dùng do/does. Sau does động từ trở về nguyên mẫu: He does not like tea. Does he like tea?',
        examples: [
          ['They do not live here.', 'Họ không sống ở đây.'],
          ['Does she drink coffee?', 'Cô ấy có uống cà phê không?'],
        ],
      },
    ],
    quiz: [
      q('He ___ to work by bus.', ['go', 'goes', 'going', 'gos'], 1, 'Go thêm -es với he.'),
      q('She ___ not like fish.', ['do', 'does', 'is', 'are'], 1, 'Dùng does not với she.'),
      q('___ you play football?', ['Do', 'Does', 'Are', 'Is'], 0, 'You đi với do.'),
      q('My sister ___ English.', ['study', 'studys', 'studies', 'studing'], 2, 'Study đổi y thành ies.'),
      q('Does he ___ coffee?', ['drinks', 'drink', 'drinking', 'drank'], 1, 'Sau does dùng động từ nguyên mẫu.'),
    ],
  },
  {
    id: 'articles',
    title: 'Mạo từ a, an, the',
    category: 'Ngữ pháp',
    level: 'A1',
    minutes: 8,
    summary: 'Chọn đúng mạo từ trước danh từ.',
    sections: [
      {
        heading: 'A và an',
        body: 'Dùng a trước âm phụ âm, an trước âm nguyên âm. Chỉ dùng với danh từ đếm được số ít khi nói chung chung.',
        examples: [
          ['a book', 'một quyển sách'],
          ['an apple', 'một quả táo'],
          ['an hour', 'một giờ (h không đọc)'],
        ],
      },
      {
        heading: 'The',
        body: 'Dùng the khi người nghe đã biết bạn đang nói đến thứ nào, hoặc chỉ có một.',
        examples: [
          ['Close the door, please.', 'Làm ơn đóng cửa lại.'],
          ['The sun is hot.', 'Mặt trời rất nóng.'],
        ],
      },
    ],
    quiz: [
      q('I eat ___ apple every day.', ['a', 'an', 'the', 'no article'], 1, 'Apple bắt đầu bằng âm nguyên âm.'),
      q('She is ___ teacher.', ['a', 'an', 'the', 'is'], 0, 'Teacher bắt đầu bằng âm phụ âm.'),
      q('Please open ___ window. It is hot.', ['a', 'an', 'the', 'one'], 2, 'Cả hai đều biết cửa sổ nào.'),
      q('He waits for ___ hour.', ['a', 'an', 'the', 'some'], 1, 'Hour đọc là /aʊə/, âm nguyên âm.'),
      q('We saw ___ moon last night.', ['a', 'an', 'the', 'no'], 2, 'Chỉ có một mặt trăng.'),
    ],
  },
  {
    id: 'plural-nouns',
    title: 'Danh từ số nhiều',
    category: 'Ngữ pháp',
    level: 'A1',
    minutes: 8,
    summary: 'Quy tắc thêm -s, -es và các dạng bất quy tắc.',
    sections: [
      {
        heading: 'Quy tắc',
        body: 'Thêm -s với phần lớn danh từ. Thêm -es sau s, x, ch, sh. Đổi y thành ies sau phụ âm.',
        examples: [
          ['book thành books', 'sách'],
          ['box thành boxes', 'hộp'],
          ['city thành cities', 'thành phố'],
        ],
      },
      {
        heading: 'Bất quy tắc',
        body: 'Một số danh từ đổi hẳn dạng: man thành men, child thành children, foot thành feet, person thành people.',
        examples: [
          ['Two children are playing.', 'Hai đứa trẻ đang chơi.'],
          ['My feet hurt.', 'Chân tôi đau.'],
        ],
      },
    ],
    quiz: [
      q('Số nhiều của box là gì?', ['boxs', 'boxes', 'boxies', 'box'], 1, 'Thêm -es sau x.'),
      q('Số nhiều của city là gì?', ['citys', 'cities', 'cityes', 'city'], 1, 'Phụ âm + y đổi thành ies.'),
      q('Số nhiều của child là gì?', ['childs', 'childes', 'children', 'childen'], 2, 'Child là danh từ bất quy tắc.'),
      q('There are three ___ in the room.', ['person', 'persons', 'people', 'peoples'], 2, 'People là số nhiều của person.'),
      q('Số nhiều của watch là gì?', ['watchs', 'watches', 'watchies', 'watch'], 1, 'Thêm -es sau ch.'),
    ],
  },
  {
    id: 'present-continuous',
    title: 'Present continuous: đang xảy ra',
    category: 'Ngữ pháp',
    level: 'A2',
    minutes: 10,
    summary: 'Diễn tả việc đang diễn ra ngay lúc nói.',
    sections: [
      {
        heading: 'Cấu trúc',
        body: 'am/is/are + động từ thêm -ing. Với động từ kết thúc bằng e, bỏ e rồi thêm -ing (make thành making).',
        examples: [
          ['I am studying now.', 'Bây giờ tôi đang học.'],
          ['She is making tea.', 'Cô ấy đang pha trà.'],
        ],
      },
      {
        heading: 'Dấu hiệu nhận biết',
        body: 'now, at the moment, right now, look!, listen!',
        examples: [
          ['They are not watching TV now.', 'Bây giờ họ không xem TV.'],
          ['Are you listening?', 'Bạn có đang nghe không?'],
        ],
      },
    ],
    quiz: [
      q('He ___ a book now.', ['reads', 'is reading', 'read', 'reading'], 1, 'Việc đang diễn ra dùng is reading.'),
      q('We ___ dinner at the moment.', ['have', 'are having', 'has', 'is having'], 1, 'We đi với are.'),
      q('Look! It ___.', ['rains', 'is raining', 'rain', 'raining'], 1, 'Look! báo hiệu việc đang xảy ra.'),
      q('Dạng -ing của make là gì?', ['makeing', 'making', 'makking', 'maken'], 1, 'Bỏ e rồi thêm -ing.'),
      q('I ___ not sleeping.', ['is', 'are', 'am', 'do'], 2, 'I đi với am.'),
    ],
  },
  {
    id: 'past-simple',
    title: 'Past simple: chuyện đã qua',
    category: 'Ngữ pháp',
    level: 'A2',
    minutes: 12,
    summary: 'Kể lại việc đã xảy ra và kết thúc trong quá khứ.',
    sections: [
      {
        heading: 'Động từ có quy tắc',
        body: 'Thêm -ed: work thành worked, play thành played. Động từ kết thúc bằng e chỉ thêm -d: live thành lived.',
        examples: [
          ['I played football yesterday.', 'Hôm qua tôi chơi bóng đá.'],
          ['She lived in Hue.', 'Cô ấy từng sống ở Huế.'],
        ],
      },
      {
        heading: 'Động từ bất quy tắc và phủ định',
        body: 'go thành went, have thành had, see thành saw. Phủ định và câu hỏi dùng did, sau đó dùng động từ nguyên mẫu.',
        examples: [
          ['We went to Da Nang.', 'Chúng tôi đã đi Đà Nẵng.'],
          ['Did you see him?', 'Bạn có thấy anh ấy không?'],
        ],
      },
    ],
    quiz: [
      q('Yesterday I ___ a movie.', ['watch', 'watched', 'watching', 'watches'], 1, 'Quá khứ có quy tắc thêm -ed.'),
      q('She ___ to school last week.', ['go', 'goes', 'went', 'gone'], 2, 'Quá khứ của go là went.'),
      q('Did he ___ the answer?', ['know', 'knew', 'knows', 'known'], 0, 'Sau did dùng động từ nguyên mẫu.'),
      q('They did not ___ here.', ['live', 'lived', 'living', 'lives'], 0, 'Phủ định với did not + nguyên mẫu.'),
      q('Quá khứ của have là gì?', ['haved', 'had', 'has', 'having'], 1, 'Have là động từ bất quy tắc.'),
    ],
  },
  {
    id: 'there-is-are',
    title: 'There is và there are',
    category: 'Ngữ pháp',
    level: 'A1',
    minutes: 8,
    summary: 'Nói về sự tồn tại của người, vật.',
    sections: [
      {
        heading: 'Cách dùng',
        body: 'There is dùng với danh từ số ít hoặc không đếm được. There are dùng với danh từ số nhiều.',
        examples: [
          ['There is a cat on the sofa.', 'Có một con mèo trên ghế sofa.'],
          ['There are two books on the desk.', 'Có hai quyển sách trên bàn.'],
        ],
      },
      {
        heading: 'Phủ định và câu hỏi',
        body: 'There is not (isn’t) hoặc There are not (aren’t). Câu hỏi: Is there…? Are there…?',
        examples: [
          ['There aren’t any eggs.', 'Không có quả trứng nào.'],
          ['Is there a bank near here?', 'Gần đây có ngân hàng không?'],
        ],
      },
    ],
    quiz: [
      q('There ___ a pen on the table.', ['is', 'are', 'am', 'be'], 0, 'Pen là danh từ số ít.'),
      q('There ___ three students in the room.', ['is', 'are', 'am', 'does'], 1, 'Students là số nhiều.'),
      q('___ there any milk?', ['Is', 'Are', 'Do', 'Does'], 0, 'Milk là danh từ không đếm được.'),
      q('There ___ not any chairs.', ['is', 'are', 'am', 'be'], 1, 'Chairs là số nhiều.'),
      q('Chọn câu đúng.', ['There is two cats.', 'There are two cats.', 'There am two cats.', 'There be two cats.'], 1, 'Two cats là số nhiều.'),
    ],
  },
  {
    id: 'can-cant',
    title: 'Can và can’t: khả năng',
    category: 'Ngữ pháp',
    level: 'A1',
    minutes: 8,
    summary: 'Nói về điều bạn có thể hoặc không thể làm.',
    sections: [
      {
        heading: 'Cách dùng',
        body: 'can + động từ nguyên mẫu, không thêm to và không thêm -s với he, she, it. Phủ định: cannot hoặc can’t.',
        examples: [
          ['I can swim.', 'Tôi biết bơi.'],
          ['She can’t drive.', 'Cô ấy không biết lái xe.'],
        ],
      },
      {
        heading: 'Câu hỏi và lời xin phép',
        body: 'Đảo can lên trước chủ ngữ. Can cũng dùng để xin phép và nhờ vả.',
        examples: [
          ['Can you help me?', 'Bạn giúp tôi được không?'],
          ['Can I sit here?', 'Tôi ngồi đây được không?'],
        ],
      },
    ],
    quiz: [
      q('She ___ speak three languages.', ['can', 'cans', 'can to', 'is can'], 0, 'Can không thêm -s.'),
      q('I ___ swim. I am afraid of water.', ['can', 'can’t', 'am', 'do'], 1, 'Câu sau cho thấy không biết bơi.'),
      q('___ you open the window?', ['Can', 'Do', 'Are', 'Does'], 0, 'Dùng Can để nhờ vả.'),
      q('He can ___ well.', ['sings', 'sing', 'singing', 'to sing'], 1, 'Sau can dùng động từ nguyên mẫu.'),
      q('Chọn câu đúng.', ['He cans run.', 'He can runs.', 'He can run.', 'He can to run.'], 2, 'can + nguyên mẫu.'),
    ],
  },
  {
    id: 'prepositions',
    title: 'Giới từ in, on, at',
    category: 'Ngữ pháp',
    level: 'A2',
    minutes: 10,
    summary: 'Chỉ thời gian và nơi chốn.',
    sections: [
      {
        heading: 'Giới từ chỉ thời gian',
        body: 'at + giờ (at 7 o’clock). on + ngày (on Monday). in + tháng, năm, mùa, buổi (in May, in 2026, in the morning).',
        examples: [
          ['The class starts at 8.', 'Lớp bắt đầu lúc 8 giờ.'],
          ['My birthday is on Friday.', 'Sinh nhật tôi vào thứ Sáu.'],
        ],
      },
      {
        heading: 'Giới từ chỉ nơi chốn',
        body: 'at + điểm cụ thể (at the bus stop). on + bề mặt (on the table). in + không gian bao quanh (in the room, in Vietnam).',
        examples: [
          ['She is at the station.', 'Cô ấy ở nhà ga.'],
          ['The keys are in the bag.', 'Chìa khóa ở trong túi.'],
        ],
      },
    ],
    quiz: [
      q('I wake up ___ six o’clock.', ['in', 'on', 'at', 'to'], 2, 'Dùng at với giờ.'),
      q('We have class ___ Monday.', ['in', 'on', 'at', 'of'], 1, 'Dùng on với ngày.'),
      q('He was born ___ 2005.', ['in', 'on', 'at', 'by'], 0, 'Dùng in với năm.'),
      q('The book is ___ the table.', ['in', 'on', 'at', 'for'], 1, 'Quyển sách nằm trên bề mặt bàn.'),
      q('They live ___ Vietnam.', ['in', 'on', 'at', 'to'], 0, 'Dùng in với quốc gia.'),
    ],
  },
  {
    id: 'question-words',
    title: 'Từ để hỏi: what, where, when, why, how',
    category: 'Ngữ pháp',
    level: 'A1',
    minutes: 9,
    summary: 'Đặt câu hỏi để lấy thông tin.',
    sections: [
      {
        heading: 'Các từ để hỏi',
        body: 'what (cái gì), where (ở đâu), when (khi nào), who (ai), why (tại sao), how (như thế nào).',
        examples: [
          ['What is your name?', 'Bạn tên là gì?'],
          ['Where do you live?', 'Bạn sống ở đâu?'],
        ],
      },
      {
        heading: 'Trật tự câu',
        body: 'Từ để hỏi + trợ động từ + chủ ngữ + động từ chính.',
        examples: [
          ['When does the class start?', 'Khi nào lớp bắt đầu?'],
          ['Why are you late?', 'Tại sao bạn đến muộn?'],
        ],
      },
    ],
    quiz: [
      q('___ do you live? In Hue.', ['What', 'Where', 'When', 'Who'], 1, 'Trả lời về nơi chốn nên hỏi where.'),
      q('___ is your birthday? In May.', ['Why', 'Who', 'When', 'How'], 2, 'Hỏi thời gian dùng when.'),
      q('___ are you sad? Because I lost my phone.', ['Why', 'What', 'Where', 'Who'], 0, 'Câu trả lời giải thích lý do.'),
      q('___ does she go to school? By bike.', ['Where', 'How', 'Who', 'What'], 1, 'Hỏi phương tiện, cách thức dùng how.'),
      q('Chọn câu đúng.', ['Where you live?', 'Where do you live?', 'Where live you?', 'Where you do live?'], 1, 'Từ hỏi + do + chủ ngữ + động từ.'),
    ],
  },
]

export const lessonsById = Object.fromEntries(lessons.map((item) => [item.id, item]))
