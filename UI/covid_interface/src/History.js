import { useQuery } from "react-query";

const History = () => {

    const { data } = useQuery('fetchArchive', async () => {
        const response = await fetch('http://localhost:3002/archive');
        const json = await response.json();
        const content = json.content;
        const length = json.length;
        return content.slice(length-11, length-1);
    }, {refetchInterval: 1000});


    return (
        <div>
            <h2>History</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Local</th>
                        <th>Action</th>
                        <th>Address</th>
                    </tr>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.local}</td>
                                <td>{item.action}</td>
                                <td>{item.address}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default History;