import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-[480px] w-[480px] bg-gray-100 rounded-lg animate-pulse" />, // Placeholder com tamanho fixo
});

export function Chart(props) {
  return <ApexChart {...props} />;
}