/**
 * Informed Consent Text for Physiotherapy
 * Version: 1.0
 * Language: Indonesian
 * Last Updated: November 1, 2025
 */

export const CONSENT_VERSION = '1.0';

export const CONSENT_TEXT = `PERSETUJUAN TINDAKAN FISIOTERAPI
(Informed Consent for Physiotherapy)

Saya yang bertanda tangan di bawah ini menyatakan bahwa:

1. PEMERIKSAAN FISIK
   Saya memberikan persetujuan kepada terapis untuk melakukan pemeriksaan fisik yang diperlukan untuk menentukan kondisi kesehatan saya dan merencanakan program terapi yang sesuai.

2. PROSEDUR TERAPI
   Saya telah mendapatkan penjelasan yang cukup mengenai:
   - Tujuan dari tindakan fisioterapi yang akan dilakukan
   - Prosedur dan metode terapi yang akan digunakan
   - Manfaat yang diharapkan dari terapi
   - Durasi dan frekuensi terapi yang direkomendasikan

3. RISIKO DAN KOMPLIKASI
   Saya memahami bahwa setiap tindakan medis memiliki risiko, termasuk namun tidak terbatas pada:
   - Rasa tidak nyaman atau nyeri sementara
   - Kelelahan setelah sesi terapi
   - Kemungkinan reaksi alergi terhadap alat atau bahan yang digunakan
   - Dalam kasus yang jarang terjadi, peningkatan gejala sementara
   
   Saya memahami bahwa terapis akan melakukan yang terbaik untuk meminimalkan risiko tersebut.

4. PENGGUNAAN DATA MEDIS
   Saya memberikan izin kepada terapis untuk:
   - Mengumpulkan dan menyimpan data riwayat kesehatan saya
   - Menggunakan informasi medis saya untuk keperluan terapi
   - Mendokumentasikan kemajuan terapi saya
   - Menjaga kerahasiaan data medis saya sesuai dengan peraturan yang berlaku

5. HAK PASIEN
   Saya memahami bahwa saya memiliki hak untuk:
   - Mendapatkan informasi lengkap tentang kondisi dan terapi saya
   - Menolak atau menghentikan terapi kapan saja
   - Mendapatkan second opinion dari profesional kesehatan lain
   - Mengajukan pertanyaan tentang terapi yang diberikan

6. KONTAK DARURAT
   Saya memberikan izin kepada terapis untuk menghubungi kontak darurat saya jika terjadi situasi yang memerlukan perhatian medis mendesak selama atau setelah sesi terapi.

7. PERNYATAAN KESEHATAN
   Saya menyatakan telah memberikan informasi yang lengkap dan benar mengenai:
   - Riwayat kesehatan saya
   - Alergi yang saya miliki (jika ada)
   - Obat-obatan yang sedang saya konsumsi
   - Kondisi medis lain yang relevan

Saya telah membaca, memahami, dan menyetujui seluruh isi persetujuan ini. Saya memberikan persetujuan ini dengan penuh kesadaran dan tanpa paksaan dari pihak manapun.

---
Version: ${CONSENT_VERSION}
Effective Date: November 1, 2025
Last Updated: November 1, 2025`;

export const CONSENT_CHECKBOXES = {
  EXAMINATION: 'agreeExamination',
  PROCEDURE: 'agreeProcedure',
  RISKS: 'agreeRisks',
  DATA_USAGE: 'agreeDataUsage',
  EMERGENCY: 'agreeEmergency',
} as const;

export const CONSENT_CHECKBOX_LABELS = {
  [CONSENT_CHECKBOXES.EXAMINATION]: 'Saya setuju untuk pemeriksaan fisik oleh terapis',
  [CONSENT_CHECKBOXES.PROCEDURE]: 'Saya memahami prosedur terapi yang akan dilakukan',
  [CONSENT_CHECKBOXES.RISKS]: 'Saya memahami risiko yang mungkin terjadi',
  [CONSENT_CHECKBOXES.DATA_USAGE]: 'Saya setuju data medis saya digunakan untuk terapi',
  [CONSENT_CHECKBOXES.EMERGENCY]: 'Saya memberikan izin kontak darurat jika diperlukan',
};
