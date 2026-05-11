import designMd from '../../docs/DESIGN_CONCEPT.md?raw';
import Layout from '../components/Layout';
import DocViewer from '../components/DocViewer';

export default function Design() {
  return (
    <Layout title="디자인 컨셉 및 로고">
      <DocViewer source={designMd} />
    </Layout>
  );
}
