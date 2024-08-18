import Layout from "./layout"
import Page from "./page"

export default function Default({children}:{children: React.ReactNode}) {
  return <Layout>
          <Page />
        </Layout>
}