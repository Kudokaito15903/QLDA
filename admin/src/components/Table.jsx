export default function Table(props) {
  return (
    <div className="overflow-auto bg-white m-6">
      <table className="table">
        <thead>
          <tr>
            {props.title.map(item => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{props.RowsDisplay}</tbody>
      </table>
    </div>
  )
}
