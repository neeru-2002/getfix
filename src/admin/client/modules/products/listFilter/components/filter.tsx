import messages from "lib/text"
import MenuItem from "material-ui/MenuItem"
import SelectField from "material-ui/SelectField"
import React from "react"
import style from "./style.sass"

const Filter = ({
  filter,
  setEnabled,
  setDiscontinued,
  setOnSale,
  setStock,
}) => {
  const { enabled, discontinued, onSale, stockStatus } = filter

  return (
    <div className={style.filter}>
      <SelectField
        value={enabled}
        onChange={(event, index, value) => {
          setEnabled(value)
        }}
        floatingLabelText={messages.enabled}
        fullWidth
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>

      <SelectField
        value={discontinued}
        onChange={(event, index, value) => {
          setDiscontinued(value)
        }}
        floatingLabelText={messages.products_discontinued}
        fullWidth
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>

      <SelectField
        value={onSale}
        onChange={(event, index, value) => {
          setOnSale(value)
        }}
        floatingLabelText={messages.products_onSale}
        fullWidth
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={false} primaryText={messages.no} />
        <MenuItem value primaryText={messages.yes} />
      </SelectField>

      <SelectField
        value={stockStatus}
        onChange={(event, index, value) => {
          setStock(value)
        }}
        floatingLabelText={messages.products_stockStatus}
        fullWidth
      >
        <MenuItem value={null} primaryText={messages.all} label=" " />
        <MenuItem value={"available"} primaryText={messages.products_inStock} />
        <MenuItem
          value={"out_of_stock"}
          primaryText={messages.products_outOfStock}
        />
        <MenuItem
          value={"backorder"}
          primaryText={messages.products_backorder}
        />
        <MenuItem value={"preorder"} primaryText={messages.products_preorder} />
        <MenuItem
          value={"discontinued"}
          primaryText={messages.products_discontinued}
        />
      </SelectField>
    </div>
  )
}

export default Filter
