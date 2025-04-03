import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // /videos フォルダ内のファイルに対して1日キャッシュ
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        // /images フォルダ内のファイルに対して1日キャッシュ
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
