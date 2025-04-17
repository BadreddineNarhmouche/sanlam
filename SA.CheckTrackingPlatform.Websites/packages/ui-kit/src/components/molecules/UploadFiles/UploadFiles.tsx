import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FileListItem,
  FormHelperText,
  Grid,
  Icons,
  Typography,
} from '../../atoms';
import styles from './styles';

interface Props {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  name: string;
  values: File[] | null;
  documentTypes?: string;
  multipleSelect?: boolean;
  label?: string;
  documentTypesLabel?: string;
  helperText?: string;
  error?: boolean;
  handleViewFile?: (file: File) => void;
  isLoading?: boolean;
}

const UploadFilesComponent = ({
  setFieldValue,
  name,
  values,
  documentTypes,
  multipleSelect,
  label,
  documentTypesLabel,
  helperText,
  error,
  handleViewFile,
  isLoading,
}: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (values) {
      setSelectedFiles(values);
    }
  }, [values]);

  /* istanbul ignore next */
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const files: File[] = Array.from(event.target.files);
      setSelectedFiles((prevSelectedFiles) => {
        // Update form data
        setFieldValue(name, [...prevSelectedFiles, ...files]);
        return [...prevSelectedFiles, ...files];
      });
      event.target.value = '';
    }
  };

  /* istanbul ignore next */
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files: File[] = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /* istanbul ignore next */
  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = prevSelectedFiles?.filter(
        (file) => file !== fileToRemove,
      );

      // Update form data
      setFieldValue(name, updatedFiles);

      return updatedFiles;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /* istanbul ignore next */
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Grid>
      <Typography variant="body2" color="base.greyMain">
        {label || 'Documents à importer ( optionnel )'}
      </Typography>
      {(multipleSelect || selectedFiles?.length <= 0) && (
        <Grid
          onDragOver={(e: { preventDefault: () => any }) => e.preventDefault()}
          onDrop={handleFileDrop}
          style={{
            ...styles.uploadContainer,
            ...(error && { border: '2px dashed red' }),
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={1}
          mb={3}
          p={4}
        >
          <Icons.Upload style={styles.uploadIcon} />

          <input
            aria-label="lorem ipsum"
            ref={fileInputRef}
            type="file"
            multiple={multipleSelect}
            onChange={handleFileInputChange}
            style={styles.inputFile}
            accept={
              documentTypes
                ? documentTypes
                : '.pdf,.xls,.xlsx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv,image/png,image/gif,image/jpeg'
            }
          />

          <Button
            color="primary"
            onClick={handleBrowseClick}
            variant="outlined"
            style={styles.uploadButton}
          >
            {multipleSelect ? 'Parcourir les fichiers' : 'Parcourir le fichier'}
          </Button>
          {documentTypesLabel && <Typography variant="body2" color="base.greyMain">
            {documentTypesLabel}
          </Typography>}
        </Grid>
      )}
      {error && (
        <Grid item xs={12}>
          <FormHelperText error>{helperText}</FormHelperText>
        </Grid>
      )}

      {selectedFiles?.length > 0 && (
              <Grid container spacing={2} mt={1} sx={{
                  height: '250px',
                  overflow: 'auto',
              }}>
          {selectedFiles?.map((file, index) => (
            <Grid
              key={index}
              item
              xs={12}
            >
              <FileListItem
                key={index}
                fileName={file.name}
                file={file}
                onRemove={handleRemoveFile}
                handleViewFile={() => handleViewFile && handleViewFile(file)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default UploadFilesComponent;
