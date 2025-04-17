import { CardContainer, EmptyState } from '@reinsurance/ui-kit'
import { useIntl } from 'react-intl';

export const NotFound = () => {
    const intl = useIntl();

    return (<CardContainer mt={3}>
        <EmptyState
            title={intl.formatMessage({
                id: 'not_found.title',
            })}
            subTitle={intl.formatMessage({
                id: 'not_found.subTitle',
            })}
        />
    </CardContainer>)
}