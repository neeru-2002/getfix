import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchFiles, uploadFiles, deleteFile } from "../actions"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector()
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    files: state.files.files,
    uploading: state.files.uploading,
    settings: state.settings.settings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchFiles())
    },
    onDelete: fileName => {
      dispatch(deleteFile(fileName))
    },
    onUpload: form => {
      dispatch(uploadFiles(form))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
