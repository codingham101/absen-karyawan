import Image from "next/image";

const UserList = ({txtName, txtEmail, txtRole, index}) => {
    return(

        <tr >
            <td>{index + 1}</td>
            <td>{txtName}</td>
            <td>{txtEmail}</td>
            <td>{txtRole}</td>
        </tr>

    )
} 

export default UserList;