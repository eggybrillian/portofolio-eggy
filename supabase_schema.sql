-- ============================================
-- PORTFOLIO EGGY B. BRILLIAN — Supabase Schema
-- Paste seluruh file ini di Supabase SQL Editor
-- ============================================

-- TABLE: projects
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  year text not null,
  title text not null,
  subtitle text not null,
  description text not null,
  tools text[] not null default '{}',
  accent text not null default '#00d4ff',
  icon text not null default '📊',
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- TABLE: certificates
create table if not exists certificates (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  organization text not null,
  year text not null,
  type text not null,
  icon text not null default '🏅',
  color text not null default '#00d4ff',
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- TABLE: skills
create table if not exists skills (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  category_icon text not null default '⚙️',
  category_color text not null default '#00d4ff',
  name text not null,
  level int not null check (level >= 0 and level <= 100),
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- ============================================
-- SEED DATA — Projects
-- ============================================
insert into projects (year, title, subtitle, description, tools, accent, icon, sort_order) values
('2025', 'Prediksi Harga Bitcoin', 'Skripsi — Deep Learning',
 'Model prediksi harga Bitcoin menggunakan arsitektur GRU (Gated Recurrent Unit). Menangani time-series data cryptocurrency dengan akurasi tinggi menggunakan teknik normalisasi dan sequence modeling.',
 array['Python','TensorFlow','GRU','Pandas','Matplotlib'], '#00d4ff', '₿', 1),

('2024–2025', 'Dashboard Rekap Data Arsip', 'PT Pupuk Kaltim — Magang',
 'Dashboard interaktif untuk rekap dan monitoring data arsip perusahaan. Memudahkan tim dalam mengakses dan menganalisis ribuan record dokumen secara real-time.',
 array['Excel','Looker Studio','SQL','Data Pipeline'], '#a78bfa', '📊', 2),

('2024', 'Prediksi Suhu Udara', 'Startup Campus Bootcamp',
 'Forecasting suhu udara menggunakan model LSTM. Proyek ini mengeksplorasi data iklim dan menghasilkan prediksi time-series yang akurat untuk wilayah tertentu.',
 array['Python','LSTM','Keras','NumPy','Scikit-learn'], '#34d399', '🌡️', 3),

('2023', 'Analisis Polusi Udara Jakarta', 'GreatEdu Bootcamp',
 'Analisis komprehensif kualitas udara Jakarta menggunakan dataset ISPU. EDA, visualisasi tren, dan identifikasi pola musiman polutan utama (PM2.5, NO2, SO2).',
 array['Python','Pandas','Seaborn','EDA','Tableau'], '#fb923c', '🌫️', 4),

('2023', 'Analisis Churn Nasabah Bank', 'Universitas Mulawarman',
 'Prediksi churn nasabah bank menggunakan Random Forest & XGBoost. Analisis fitur-fitur yang paling berpengaruh terhadap keputusan nasabah berhenti menggunakan layanan.',
 array['Python','Scikit-learn','XGBoost','Feature Engineering','SMOTE'], '#f472b6', '🏦', 5);

-- ============================================
-- SEED DATA — Certificates
-- ============================================
insert into certificates (title, organization, year, type, icon, color, sort_order) values
('Magang PT. Pupuk Kaltim', 'PT Pupuk Kaltim', '2025', 'Industri', '🏭', '#00d4ff', 1),
('Bootcamp Data Science & AI', 'Startup Campus', '2024', 'Bootcamp', '🤖', '#a78bfa', 2),
('Certified Associate Data Scientist', 'BNSP', '2023', 'Sertifikasi', '🏅', '#fbbf24', 3),
('Bootcamp Data Analyst', 'GreatEdu', '2023', 'Bootcamp', '📈', '#34d399', 4),
('Introduction to Data Analytics', 'RevoU', '2023', 'Course', '📚', '#fb923c', 5),
('Database Programming SQL', 'Oracle Academy', '2022', 'Sertifikasi', '🗄️', '#f472b6', 6),
('Database Design', 'Oracle Academy', '2022', 'Sertifikasi', '🔧', '#60a5fa', 7);

-- ============================================
-- SEED DATA — Skills
-- ============================================
insert into skills (category, category_icon, category_color, name, level, sort_order) values
('Bahasa & Tools', '⚙️', '#00d4ff', 'Python', 90, 1),
('Bahasa & Tools', '⚙️', '#00d4ff', 'SQL / MySQL', 85, 2),
('Bahasa & Tools', '⚙️', '#00d4ff', 'Excel', 88, 3),
('Bahasa & Tools', '⚙️', '#00d4ff', 'Tableau', 75, 4),
('Bahasa & Tools', '⚙️', '#00d4ff', 'Looker Studio', 78, 5),
('Bahasa & Tools', '⚙️', '#00d4ff', 'Google Colab', 92, 6),

('Skill Teknis', '🔬', '#a78bfa', 'EDA', 90, 1),
('Skill Teknis', '🔬', '#a78bfa', 'Visualisasi Data', 85, 2),
('Skill Teknis', '🔬', '#a78bfa', 'ML Supervised', 80, 3),
('Skill Teknis', '🔬', '#a78bfa', 'ML Unsupervised', 75, 4),
('Skill Teknis', '🔬', '#a78bfa', 'Deep Learning (GRU/LSTM)', 78, 5),
('Skill Teknis', '🔬', '#a78bfa', 'Dashboarding', 82, 6),

('Soft Skills', '💡', '#34d399', 'Problem Solving', 90, 1),
('Soft Skills', '💡', '#34d399', 'Critical Thinking', 88, 2),
('Soft Skills', '💡', '#34d399', 'Communication', 85, 3),
('Soft Skills', '💡', '#34d399', 'Leadership', 80, 4);

-- ============================================
-- ROW LEVEL SECURITY — baca bebas, tulis butuh auth
-- ============================================
alter table projects enable row level security;
alter table certificates enable row level security;
alter table skills enable row level security;

-- Allow public read
create policy "Public read projects" on projects for select using (true);
create policy "Public read certificates" on certificates for select using (true);
create policy "Public read skills" on skills for select using (true);

-- Allow all operations for authenticated users (admin)
create policy "Auth full access projects" on projects for all using (auth.role() = 'authenticated');
create policy "Auth full access certificates" on certificates for all using (auth.role() = 'authenticated');
create policy "Auth full access skills" on skills for all using (auth.role() = 'authenticated');
