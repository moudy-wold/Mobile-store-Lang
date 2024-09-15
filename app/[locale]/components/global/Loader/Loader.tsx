'use client';
import { Space, Spin } from 'antd';

type Props = {
  isLoading?: boolean;
};

function Loader({ isLoading = true }: Props) {
  return (
    <div
      className={`fixed inset-0 !z-[9999999999] flex items-center justify-center backdrop-blur-md bg-white/20 ${
        isLoading ? '' : 'hidden'
      }`}
    >
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
}

export default Loader;
