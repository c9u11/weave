import planMd from '../../docs/IDEATHON_PLAN.md?raw';
import Layout from '../components/Layout';
import DocViewer from '../components/DocViewer';

export default function Plan() {
  return (
    <Layout title="우리 아이디어 기획안">
      <DocViewer source={planMd} />
    </Layout>
  );
}
