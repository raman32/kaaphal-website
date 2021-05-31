import 'braft-editor/dist/index.css'
import AdminLayout from '../../layouts/default'

import Editor from '../../../lib/components/Editor'
const CreateArticle = (): JSX.Element => {
    return <Editor />
}

// eslint-disable-next-line react/display-name
CreateArticle.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateArticle;