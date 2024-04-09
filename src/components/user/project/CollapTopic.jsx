import { Collapse } from "antd";
import { useEffect, useState } from "react";

const CollapseTopic = ({ data = [] }) => {
    const [itemsCollapse, setItemsCollapse] = useState([])

    useEffect(() => {
        if (!data && !data?.length) return

        const newData = data.map((items, index) => ({
            key: index,
            label: 'Trạng thái đề tài nộp lại ' + index,
            children: [
                <>
                    <div>
                        <p style={{ margin: 0 }} key={index}>File nộp lại:</p>
                        {items.attachments.map((ele, index) => <><a target="_blank" href={ele.fileLink}>{ele.fileName}</a><br /></>)}
                    </div>
                    <p>Quyết định của chairman:{" "}{items.isAccepted} <a target="_blank" href={items.feedbackFileLink}>File góp ý</a></p>
                </>],
        }))
        setItemsCollapse(newData)
    }, [data])

    return <Collapse items={itemsCollapse} />

}
export default CollapseTopic;