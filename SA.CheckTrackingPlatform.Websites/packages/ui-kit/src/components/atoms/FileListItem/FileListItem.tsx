import { CircularProgress } from '@mui/material';
import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, IconButton, Icons, Typography, Button } from '../../atoms';
import styles from './styles';
import { GeneralHelper } from '@checkTracking/helpers';

interface FileListItemProps {
  file?: File | null;
  fileName: string;
  onRemove?: (file: File) => void;
  handleViewFile?: any;
  handleUploadFile?: any;
  handleDownloadFile?: any;
  setFile?: (file: File | null) => void;
  documentTypes?: string;
  fileDescription?: string;
  displayFile?: boolean;
  isLoading?: boolean;
  error?: boolean;
  isLoadingView?: boolean;
  errorView?: boolean;
}

const FileListItem: React.FC<FileListItemProps> = ({
  file,
  fileName,
  onRemove,
  handleViewFile,
  handleUploadFile,
  handleDownloadFile,
  setFile,
  documentTypes,
  fileDescription,
  displayFile,
  isLoading,
  error,
  isLoadingView,
  errorView,
}) => {

  const [selectedFile, setSelectedFile] = useState<File | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* istanbul ignore next */
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const file: File = event.target.files[0];
      setSelectedFile(() => {
        setFile && setFile(file);
        return file;
      });
      event.target.value = '';
    }
  };

  /* istanbul ignore next */
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /* istanbul ignore next */
  const handleRemoveFile = () => {
    setSelectedFile(() => {
      setFile && setFile(null);
      return null;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Grid container direction="row" style={styles.container(error)} spacing={1}>
      <Grid item xs={1}>
        <Icons.LibraryBooks color="primary" style={styles.fileIcon} />
      </Grid>
      <Grid item xs sx={{ paddingBottom: 1 }}>
        <Typography
          variant="body2"
          color="textSecondary"
          style={styles.fileNameText}
        >
          {fileName}
        </Typography>
        {fileDescription && <Typography
          variant="body2"
          color="#5BD050"
          style={styles.fileNameText}
        >
          {fileDescription}
        </Typography>
        }
      </Grid>

      <Grid item>
        {handleViewFile && ((!file && displayFile) || (file && GeneralHelper.isPdfExtension(file.name))) && (
          <IconButton
            aria-controls="menu-appbar"
            color="primary"
            onClick={() =>
              !isLoadingView && handleViewFile()
            }
          >
            {isLoadingView ? (
              <CircularProgress color="primary" size={24} />
            ) : errorView ? (
              <Icons.Replay color="primary" />
            ) : <Icons.RemoveRedEye sx={{ color: (file && handleUploadFile) ? "#5BD050" : "primary" }} />}
          </IconButton>
        )}

        {handleDownloadFile && (
          <IconButton
            aria-controls="menu-appbar"
            color="primary"
            onClick={() =>
              !isLoading && handleDownloadFile()
            }
          >
            {isLoading ? (
              <CircularProgress color="primary" size={24} />
            ) : error ? (
              <Icons.Replay color="primary" />
            ) : <Icons.Download sx={{ color: (file && handleUploadFile) ? "#5BD050" : "primary" }} />}
          </IconButton>
        )}

        {handleUploadFile && (
          <>
            <input
              aria-label="lorem ipsum"
              ref={fileInputRef}
              type="file"
              multiple={false}
              onChange={handleFileInputChange}
              style={styles.inputFile}
              accept={
                documentTypes
                  ? documentTypes
                  : '.pdf,.xls,.xlsx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv,image/png,image/gif,image/jpeg'
              }
            />

            <IconButton
              aria-controls="menu-appbar"
              color="primary"
              onClick={() =>
                handleBrowseClick()
              }
            >
              <Icons.Upload sx={{ color: "#5BD050" }} />
            </IconButton>
          </>
        )}

        {selectedFile && handleUploadFile && (
          <IconButton
            aria-controls="menu-appbar"
            color="primary"
            onClick={() => handleRemoveFile()}
          >
            <Icons.Delete color="error" />{' '}
          </IconButton>
        )}

        {onRemove && file && (
          <IconButton
            aria-controls="menu-appbar"
            color="primary"
            onClick={() => { onRemove(file) }}
          >
            <Icons.Delete color="error" />{' '}
          </IconButton>
        )}
      </Grid>

      <Grid item xs={12}>
        {((error || errorView) && !isLoading && !isLoadingView) && (
          <Typography
            variant="body2"
            color="textSecondary"
            style={styles.errorText}
            mt={1}
          >
            <FormattedMessage id="download.document.error" />
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default FileListItem;