import { useState, useEffect } from "react"
import useQuery from "../../utils/useQuery"

export default function Dashboard(id) {

    const [poll, setPoll] = useState({})

    const query = useQuery()

    console.log(query);


    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}