//"2026-10-3"
export const getDateString=(date:Date)=>{
  const year=date.getFullYear()
  const month=String(date.getMonth()+1).padStart(2,"0")
  const day=String(date.getDate()).padStart(2,"0")
  return `${year}-${month}-${day}`
}

// //Url last part
// export const createParams = (venue:string[],datePeriod:string,format:string[],language:string[],timeOfDay:string[],sort:string,page:number) => {
//   const params = new URLSearchParams()

//   venue.forEach((item) => {
//     params.append("venues[]", item)
//   })

//   params.set("date", datePeriod)

//   format.forEach((item) => {
//     params.append("formats[]", item)
//   })

//   language.forEach((item) => {
//     params.append("languages[]", item)
//   })

//   timeOfDay.forEach((item) => {
//     params.append("bands[]", item)
//   })

//   params.set("sort", sort)
//   params.set("page", String(page))

 
//   console.error(params.toString())
//    return params
// }