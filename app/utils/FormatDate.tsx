import moment from "moment"

const FormatDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY")
}

export default FormatDate