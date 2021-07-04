import React from 'react';

const Data = (props) => {
    let tableData = [];
    let offSet = (props.offSet < 0 ? 0 : props.offSet > props.items.length ? props.items.length : props.offSet);
    let limit = (props.limit < 0 ? 0 : props.limit > props.items.length ? props.items.length : props.limit);
    console.log(offSet, limit)
    for (let itemCount = offSet; itemCount < limit; itemCount++) {
        tableData.push(props.items[itemCount]);
    }
    //console.log(props)
    return (
        <table>

            <tbody>
                <tr>
                    <th>Author</th>
                    <th>Domain</th>
                    <th>CREATED</th>
                </tr>
                {


                    tableData.map((value, i) => (
                        <tr key={i}>

                            <td>{value.data.author}</td>
                            <td>{value.data.domain}</td>
                            <td>{value.data.created.toString()}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};



export default Data;