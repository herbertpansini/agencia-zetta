import { Table } from 'primeng/table';
import { Pageable } from './pageable';

export class PageableUtil {
    static buildPageable(tableLista?: Table): Pageable {
        const pageable = tableLista != null && tableLista.first != null && tableLista.rows != null ? new Pageable((tableLista.first / tableLista.rows), tableLista.rows) : new Pageable(0, 10);

        if (tableLista != null && tableLista.sortField != null && tableLista.sortOrder != null) {
            pageable.setSort(tableLista.sortOrder, tableLista.sortField);
        }
        return pageable;
    }
}
