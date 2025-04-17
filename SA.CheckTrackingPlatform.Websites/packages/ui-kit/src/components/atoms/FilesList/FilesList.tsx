import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FileListItem, Grid, Typography } from '../../atoms';
import styles from './styles';
import { UI_Typography } from '../../../styles';

interface FilesListProps {
    values: any;
    input: any;
    services: any;
    fileTemplates: Array<any>;
}

const FilesList: React.FC<FilesListProps> = ({
    values,
    input,
    services,
    fileTemplates,
}) => {
    const withTemplate = (input: any) => input?.files && input?.files?.length > 0;

    return (
        <React.Fragment>
            {values?.length > 0 ||
                (withTemplate(input) && fileTemplates.length > 0) ? (
                <>
                    <Grid container spacing={2} sx={styles.fileListContainer}>
                        {(withTemplate(input) ? fileTemplates : values)?.map(
                            (document: any, index: number) => (
                                <Grid
                                    item
                                    xs={
                                        12 /
                                        (withTemplate(input)
                                            ? Math.max(fileTemplates.length || 1, 1)
                                            : Math.max(values?.length || 1, 1))
                                    }
                                    key={index}
                                >
                                    <FileListItem
                                        fileName={document?.name}
                                        file={new File(['file'], document?.name)}
                                        handleDownloadFile={() => {
                                            withTemplate(input)
                                            document?.onClick && document?.onClick(document.id);
                                        }}
                                    />
                                </Grid>
                            ),
                        )}
                    </Grid>
                </>
            ) : (
                <Typography
                    variant="body2"
                    fontWeight={UI_Typography.FONT_WEIGHT_MEDIUM}
                >
                    <FormattedMessage id="details.documents.empty" />
                </Typography>
            )}
        </React.Fragment>
    );
};

export default FilesList;
