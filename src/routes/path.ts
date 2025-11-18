const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
}

export const ROOTS_PASSIO_INVOICE = '/passio-invoice';

export const PATH_PASSIO_INVOICE = {
  root: ROOTS_PASSIO_INVOICE,
  edit: (id: string) => path(ROOTS_PASSIO_INVOICE, `/edit/${id}`),
};

