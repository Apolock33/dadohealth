import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../../assets/css/datatable.css';

const GeneralTable = ({ data, exibitedRows, columns }: any) => {
    return (
        <DataTable
            className="p-datatable-table"
            size="large"
            value={data}
            removableSort
            selectionMode={'single'}
            tableStyle={{ minWidth: '50rem' }}
            paginator
            rows={exibitedRows}
            rowsPerPageOptions={[5, 10, 25, 50]}
        >
            {columns.map((column: any) => (
                <Column key={column.name} field={column.field} header={column.name} sortable={column.sortable} body={column.body} style={{ width: '50%' }}></Column>
            ))}
        </DataTable>
    );
}

export default GeneralTable;