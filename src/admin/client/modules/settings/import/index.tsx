import { useAppDispatch, useAppSelector } from "lib/hooks"
import { connect } from "react-redux"
import { fetchImportSettings } from "../actions"
import Form from "./components/form"

const Redux = props => {
  const {} = useAppSelector()
  const dispatch = useAppDispatch()

  return null
}

const mapStateToProps = state => {
  return {
    importSettings: state.settings.importSettings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchImportSettings())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
