export const exportCSV = (data, headers) => {
  const stringfyRow = (values) => {
    let ret = "";
    values.forEach((value, index) => ret += index === 0 ? `${value}` : `,${value}`);
    ret += "\n"
    return ret;
  };

  let exportData = "";
  const keys = headers.map(header => header.label);
  exportData = stringfyRow(keys);

  data.forEach((row, index) => {
    const inlineRow = [];
    // headers.forEach((header) => {
    //   if (header.dataKey === HeaderDataTypes.AUTO_INC) inlineRow.push((index + 1).toString())
    //   else inlineRow.push(row[header.dataKey])
    // })
    exportData += stringfyRow(inlineRow);
  })

  const fileName = new Date().toLocaleDateString()
  let responseFileName = decodeURI(
    fileName + ".csv"
  );
  let url = window.URL.createObjectURL(new Blob([exportData]));
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", responseFileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
