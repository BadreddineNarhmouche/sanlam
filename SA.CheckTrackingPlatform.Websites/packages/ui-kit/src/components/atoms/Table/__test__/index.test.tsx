import renderer from 'react-test-renderer';
import Table from '../index';

describe('Table', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Table
          isCollapsable={true}
          rows={[
            {
              id: 'fake-id',
              reference: '1693925023454-0',
              status: '1',
              demandType: 'Quittance',
              client: 'test',
              creationDate: '03-09-2023',
              details: [
                {
                  reference: 'AT/1693925023454-9',
                  branch: 'AT',
                  product: 'AT marins pecheurs',
                  dateOfReceipt: '03-09-2023',
                  limitDate: '10-09-2023',
                  updateDate: '05-09-2023',
                },
              ],
            },
            {
              id: 'fake-id',
              reference: '1693925023454-9',
              status: '1',
              demandType: 'Quittance',
              client: 'test',
              creationDate: '03-09-2023',
              details: [
                {
                  reference: 'AT/1693925023454-9',
                  branch: 'AT',
                  product: 'AT marins pecheurs',
                  dateOfReceipt: '03-09-2023',
                  limitDate: '10-09-2023',
                  updateDate: '05-09-2023',
                },
                {
                  reference: 'AT/1693925023454-9',
                  branch: 'AT',
                  product: 'AT marins pecheurs',
                  dateOfReceipt: '03-09-2023',
                  limitDate: '10-09-2023',
                  updateDate: '05-09-2023',
                },
              ],
            },
          ]}
          columns={[
            {
              title: 'N° de demande',
            },
            {
              title: 'Statut',
            },
            {
              title: 'Type de demande',
            },
            {
              title: 'Dénomination',
            },
            {
              title: 'Date de création',
            },
          ]}
          detailsColumns={[
            {
              title: 'reference',
            },
            {
              title: 'Branche',
            },
            {
              title: 'Produit',
            },
            {
              title: 'Date réception',
            },
            {
              title: 'Date limite',
            },
            {
              title: 'Date Mise à jour',
            },
          ]}
          hiddenColumns={['id', 'details']}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
