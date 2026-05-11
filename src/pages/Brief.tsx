import briefMd from '../../docs/IDEATHON_BRIEF.md?raw';
import Layout from '../components/Layout';
import DocViewer from '../components/DocViewer';

export default function Brief() {
  return (
    <Layout title="아이디어톤 설명">
      <DocViewer source={briefMd} />
    </Layout>
  );
}
