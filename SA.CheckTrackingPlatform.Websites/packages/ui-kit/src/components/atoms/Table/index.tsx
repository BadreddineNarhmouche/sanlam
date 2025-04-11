import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ManageClientIcon from "@mui/icons-material/ManageAccountsSharp";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import React, { memo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Theme } from "../../../styles";
import Box from "../Box/Box";
import Grid from "../Grid/Grid";
import Pagination from "../Pagination/Pagination";
import Typography from "../Typography/Typography";
import CommentIcon from "@mui/icons-material/Comment";

const Row = (props: {
  row: any;
  level: number;
  isCollapsable: boolean;
  detailsColumns?: any;
  nestedDetailsColumns?: any;
  hiddenColumns?: any;
  onOpenDetailRow?: any;
  onClickCommentRow?: any;
  onClickDetailRow?: any;
  onClickClientDetail?: any;
  onClickDetailsColumnsDetailRow?: any;
  handleCheckBoxChange?: any;
  selected?: any[];
  isFirstRowToDisplaySelect?: boolean;
}) => {
  const {
    row,
    level,
    isCollapsable,
    detailsColumns,
    nestedDetailsColumns,
    hiddenColumns,
    onOpenDetailRow,
    onClickCommentRow,
    onClickDetailRow,
    onClickClientDetail,
    onClickDetailsColumnsDetailRow,
    handleCheckBoxChange,
    selected,
    isFirstRowToDisplaySelect,
  } = props;

  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    handleCheckBoxChange(row);
  };

  return (
    <React.Fragment>
      <TableRow>
        <>
          {isCollapsable && (
            <TableCell>
              {isFirstRowToDisplaySelect && level === 0 && (
                <Checkbox
                  checked={selected?.includes(row.id)}
                  onChange={toggleCheckbox}
                />
              )}
              {row.details?.length > 0 ? (
                <>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setOpen(!open);
                      onOpenDetailRow &&
                        onOpenDetailRow({ data: row, isOpen: open });
                    }}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </>
              ) : !isFirstRowToDisplaySelect && level > 1 ? (
                <Checkbox
                  checked={selected?.includes(row.id)}
                  onChange={toggleCheckbox}
                />
              ) : null}
            </TableCell>
          )}
          {Object.entries(row)?.map(
            ([key, value]: any, index: number) =>
              !hiddenColumns?.includes(key) && (
                <TableCell
                  component="th"
                  scope="row"
                  key={"TableCell-" + index}
                >
                  {value}
                </TableCell>
              )
          )}
          {onClickDetailsColumnsDetailRow && level === 1 && (
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  onClickDetailsColumnsDetailRow(row);
                }}
              >
                <MoreHorizRoundedIcon color="primary" />
              </IconButton>
            </TableCell>
          )}
          {onClickClientDetail && (
            <TableCell>
              <IconButton
                aria-controls="menu-appbar"
                color="primary"
                onClick={() => onClickClientDetail(row)}
              >
                <ManageClientIcon color="primary" />
              </IconButton>
            </TableCell>
          )}
          {onClickCommentRow && row?.policyPaymentStatusCode !== "Paid" ? (
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  onClickCommentRow(row);
                }}
              >
                <CommentIcon color="primary" />
              </IconButton>
            </TableCell>
          ) : (
            <TableCell></TableCell>
          )}
          {onClickDetailRow && (
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  onClickDetailRow(row);
                }}
              >
                <MoreHorizRoundedIcon color="primary" />
              </IconButton>
            </TableCell>
          )}
        </>
      </TableRow>

      {isCollapsable && (
        <TableRow
          {...(open && {
            style: {
              border: "10px solid #e6f1fa",
            },
          })}
        >
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={Object.entries(row)?.length}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {detailsColumns
                        ? detailsColumns?.map((column: any, index: number) => (
                            <TableCell
                              align="left"
                              key={index}
                              style={{
                                // @ts-ignore
                                color: Theme.theme.palette.base.greyLight,
                              }}
                            >
                              {column.title}
                            </TableCell>
                          ))
                        : nestedDetailsColumns?.map(
                            (column: any, index: number) => (
                              <TableCell
                                align="left"
                                key={index}
                                style={{
                                  // @ts-ignore
                                  color: Theme.theme.palette.base.greyLight,
                                }}
                              >
                                {column.title}
                              </TableCell>
                            )
                          )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.details?.map((row: any, index: number) => (
                      <Row
                        key={index}
                        level={level + 1}
                        row={row}
                        isCollapsable={isCollapsable}
                        nestedDetailsColumns={nestedDetailsColumns}
                        hiddenColumns={hiddenColumns}
                        onOpenDetailRow={onOpenDetailRow}
                        onClickClientDetail={onClickClientDetail}
                        onClickDetailsColumnsDetailRow={
                          onClickDetailsColumnsDetailRow
                        }
                        handleCheckBoxChange={handleCheckBoxChange}
                        selected={selected}
                        isFirstRowToDisplaySelect={isFirstRowToDisplaySelect}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

const TableComponent = (props: {
  rows: any;
  columns: any;
  isCollapsable: boolean;
  detailsColumns?: any;
  nestedDetailsColumns?: any;
  hiddenColumns?: any;
  onOpenDetailRow?: any;
  onClickDetailRow?: any;
  onClickCommentRow?: any;
  onClickDetailsColumnsDetailRow?: any;
  fixedRow?: any;
  onClickClientDetail?: any;
  handleCheckBoxChange?: any;
  selected?: any[];
  isFirstRowToDisplaySelect?: boolean;
  pagination?: {
    meta: {
      itemsCount: number;
      pageCount: number;
      pageIndex: number;
      pageSize: number;
      totalCount: number;
    };
    handleOnChangePage: any;
  };
}) => {
  const {
    rows,
    columns,
    isCollapsable,
    detailsColumns,
    nestedDetailsColumns,
    hiddenColumns,
    onOpenDetailRow,
    onClickCommentRow,
    onClickDetailRow,
    onClickDetailsColumnsDetailRow,
    fixedRow,
    onClickClientDetail,
    handleCheckBoxChange,
    selected,
    isFirstRowToDisplaySelect,
    pagination,
  } = props;

  const { pageCount, pageIndex, pageSize, totalCount, itemsCount } =
    pagination?.meta ?? {
      itemsCount: 0,
      pageCount: 0,
      pageIndex: 0,
      pageSize: 0,
      totalCount: 0,
    };

  const stickyRowStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "#FFF4E7",
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer {...(fixedRow ? { sx: { maxHeight: "500px" } } : {})}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {isCollapsable && <TableCell align="left" />}
              {columns?.map((column: any, index: number) => (
                <TableCell
                  align="left"
                  key={index}
                  style={{
                    // @ts-ignore
                    color: Theme.theme.palette.base.greyLight,
                  }}
                >
                  {column.title}
                </TableCell>
              ))}
              {onClickCommentRow && <TableCell align="left" />}
              {onClickDetailRow && <TableCell align="left" />}
              {onClickClientDetail && <TableCell align="left" />}
            </TableRow>
            {fixedRow && (
              <TableRow sx={stickyRowStyle}>
                {Object.keys(fixedRow)?.map((key, index) => (
                  <TableCell align="left" key={index}>
                    {fixedRow[key]}
                  </TableCell>
                ))}
                {onClickCommentRow && <TableCell align="left" />}
                {onClickDetailRow && <TableCell align="left" />}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {rows?.map((row: any, index: number) => (
              <Row
                key={index}
                level={0}
                row={row}
                isCollapsable={isCollapsable}
                detailsColumns={detailsColumns}
                nestedDetailsColumns={nestedDetailsColumns}
                hiddenColumns={hiddenColumns}
                onOpenDetailRow={onOpenDetailRow}
                onClickDetailRow={onClickDetailRow}
                onClickCommentRow={onClickCommentRow}
                onClickClientDetail={onClickClientDetail}
                onClickDetailsColumnsDetailRow={onClickDetailsColumnsDetailRow}
                handleCheckBoxChange={handleCheckBoxChange}
                selected={selected}
                isFirstRowToDisplaySelect={isFirstRowToDisplaySelect}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", p: 2 }}>
              <Typography
                variant="body2"
                color="base.greyMain"
                mr={3}
                ml={1}
                mt={1}
              >
                <FormattedMessage id="table.result.message" />
              </Typography>
              <Typography variant="body2" color="base" mt={1}>
                {pageSize * (pageIndex - 1) + itemsCount} / {totalCount}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <Pagination
                count={pageCount}
                page={pageIndex}
                onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                  pagination.handleOnChangePage(value)
                }
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default memo(TableComponent);
