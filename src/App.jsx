import { useEffect, useMemo, useState } from 'react';

const tabs = ['TRỰC TIẾP', 'XSMB', 'XSMT', 'XSMN', 'VIETLOTT', 'THỐNG KÊ', 'PHÂN TÍCH', 'XỔ THỬ', 'SỐ KẾT QUẢ', 'TIN TỨC'];

const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];

const provinces = {
  mb: ['Bình Định', 'Đà Nẵng', 'Đắk Lắk', 'Gia Lai', 'Khánh Hòa', 'Kon Tum', 'Ninh Thuận', 'Phú Yên', 'Quảng Bình', 'Quảng Ngãi', 'Quảng Trị', 'Thừa Thiên Huế'],
  mt: ['Bình Định', 'Đà Nẵng', 'Đắk Lắk', 'Gia Lai', 'Khánh Hòa', 'Kon Tum', 'Ninh Thuận', 'Phú Yên', 'Quảng Bình', 'Quảng Ngãi', 'Quảng Trị', 'Thừa Thiên Huế'],
  mn: ['TP. HCM', 'An Giang', 'Bình Dương', 'Bạc Liêu', 'Bến Tre', 'Vũng Tàu', 'Đồng Tháp', 'Long An', 'Tiền Giang'],
};

const regions = [
  { label: 'Miền Bắc', data: ['18:15', '17:15', '16:15', '17:15'] },
  { label: 'Miền Trung', data: ['15:00', '14:00', '16:00', '17:00'] },
  { label: 'Miền Nam', data: ['16:15', '18:15', '17:00', '16:00'] },
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('kqxs-theme') || 'light');
  const [search, setSearch] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kqxs-theme', theme);
  }, [theme]);

  const filtered = useMemo(() => {
    const list = Object.entries(provinces).flatMap(([group, items]) =>
      items.map((name) => ({ group, name })),
    );

    return list.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">
            <span>XOSO</span>
            <small>THÀNH CÔNG</small>
          </div>
        </div>

        <h1>
          CHUYỂN TRANG TRỰC TIẾP KẾT QUẢ
          <span> XỔ SỐ KIẾN THIẾT 24H</span>
        </h1>

        <div className="quick-check">
          <div className="quick-check-header">
            <span>Để vỗ số online</span>
            <button type="button" className="theme-toggle" onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          <div className="quick-check-form">
            <input type="text" placeholder="Vé số" />
            <input type="text" placeholder="Ngày" defaultValue="dd/mm/yyyy" />
            <select defaultValue="TP. Thủ Thừa">
              <option>TP. Thủ Thừa</option>
            </select>
            <button type="button">Đỏ kết quả</button>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <button type="button" className="nav-home">🏠</button>
        {tabs.map((tab, index) => (
          <button key={tab} type="button" className={index === 0 ? 'active' : ''}>{tab}</button>
        ))}
      </nav>

      <main className="content-grid">
        <section className="content-main">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm tỉnh/thành..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="result-card">
            <div className="table-title">LỊCH XSKT NGÀY THỨ TƯ 28-10-2026</div>
            <div className="three-cols">
              {regions.map((region) => (
                <div key={region.label} className="region-box">
                  <div className="region-header">{region.label}</div>
                  <div className="region-body">
                    {region.data.map((time, idx) => (
                      <div className="region-row" key={`${region.label}-${time}-${idx}`}>
                        <span>{idx === 0 ? 'Truyền thống' : idx === 1 ? 'Khai thác' : idx === 2 ? 'Kết quả' : 'Đợt khác'}</span>
                        <strong>{time}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lottery-strip">
            <div className="strip-header">XỔ SỐ KIẾN THIẾT 24H – CẬP NHẬT KQXS 3 MIỀN BẮC – TRUNG – NAM MỖI NGÀY</div>
            <div className="ball-line">
              {Array.from({ length: 18 }, (_, idx) => (
                <span key={idx} className="ball-box">{idx % 2 === 0 ? '0' : '1'}</span>
              ))}
            </div>
            <div className="strip-note">Đang chờ xổ số Miền Nam lúc 16h14, Chúc các bạn may mắn...</div>
          </div>

          <div className="schedule-grid">
            {weekDays.map((day) => (
              <div key={day} className="day-col">{day}</div>
            ))}
          </div>

          <div className="draw-table">
            <div className="table-header">XỔ SỐ MIỀN NAM NGÀY 27-10-2026</div>
            <div className="table-header-sub">XSMN / XSMN THỬ BA / KQXSMN 27-10-2026</div>

            <div className="draw-grid">
              <div className="grid-row header-row">
                <div>Giải</div>
                <div>Bến Tre</div>
                <div>Vũng Tàu</div>
                <div>Bạc Liêu</div>
              </div>

              {[
                ['Giải tám', '15', '37', '95'],
                ['Giải bảy', '808', '404', '176'],
                ['Giải sáu', '9897', '8995', '2959'],
                ['Giải năm', '3998', '5465', '1678'],
              ].map(([label, a, b, c]) => (
                <div key={label} className="grid-row">
                  <div>{label}</div>
                  <div>{a}</div>
                  <div>{b}</div>
                  <div>{c}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="sidebar">
          <div className="panel">
            <div className="panel-title">Tường Thuật Trực Tiếp Xổ Số</div>
            <div className="panel-list">
              <div className="list-item">▶ Xổ số Miền Bắc</div>
              <div className="list-item">▶ Xổ số Miền Trung</div>
              <div className="list-item">▶ Xổ số Miền Nam</div>
            </div>
            <div className="legend">
              <span className="dot dot-red" /> đỏ
              <span className="dot dot-blue" /> xanh
              <span className="dot dot-gray" /> xám
              <span className="badge">NEW</span>
            </div>
          </div>

          <div className="panel panel-green">
            <div className="panel-title">Xổ Số Miền Bắc</div>
            <ul>
              <li>▶ Miền Bắc</li>
            </ul>
          </div>

          <div className="panel panel-green">
            <div className="panel-title">Xổ Số Miền Trung</div>
            <ul>
              {['Bình Định', 'Đà Nẵng', 'Đắk Lắk', 'Gia Lai', 'Khánh Hòa', 'Kon Tum', 'Ninh Thuận', 'Phú Yên', 'Quảng Bình', 'Quảng Ngãi', 'Quảng Trị', 'Thừa Thiên Huế'].map((item) => (
                <li key={item}>▶ {item}</li>
              ))}
            </ul>
          </div>

          <div className="panel panel-green">
            <div className="panel-title">Xổ Số Miền Nam</div>
            <ul>
              {['TP. HCM', 'An Giang', 'Bình Dương', 'Bạc Liêu', 'Bến Tre', 'Vũng Tàu', 'Đồng Tháp', 'Long An', 'Tiền Giang'].map((item) => (
                <li key={item}>▶ {item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      {search && (
        <div className="search-result-overlay">
          {filtered.slice(0, 12).map(({ group, name }) => (
            <div key={`${group}-${name}`} className="search-result-item">
              <span>{name}</span>
              <small>{group}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
