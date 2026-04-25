<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password ToolKeuangan</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
            <div style="padding:32px;background:linear-gradient(135deg,#0f172a,#1d4ed8);color:#ffffff;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.8;">ToolKeuangan</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;">Reset Password</h1>
            </div>

            <div style="padding:32px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Halo {{ $userName ?: 'Pengguna ToolKeuangan' }},</p>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
                    Kami menerima permintaan untuk mereset password akun Anda. Gunakan tombol di bawah ini untuk membuka halaman reset password.
                </p>

                <div style="margin:24px 0;">
                    <a href="{{ $resetUrl }}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:14px;font-weight:700;">
                        Buka Halaman Reset Password
                    </a>
                </div>

                <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#475569;">
                    Jika tombol tidak bekerja, Anda bisa membuka link ini secara manual:
                </p>
                <p style="margin:0 0 20px;font-size:14px;line-height:1.7;word-break:break-all;color:#1d4ed8;">
                    {{ $resetUrl }}
                </p>

                <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#475569;">
                    Token reset:
                </p>
                <div style="margin:0 0 20px;padding:12px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;font-size:14px;font-weight:700;color:#1e3a8a;word-break:break-all;">
                    {{ $resetToken }}
                </div>

                <p style="margin:0;font-size:14px;line-height:1.7;color:#64748b;">
                    Abaikan email ini jika Anda tidak merasa meminta reset password. Token akan kedaluwarsa dalam 60 menit.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
