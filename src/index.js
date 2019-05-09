import React from "react";
import { render } from "react-dom";
import {
  DataTable,
  DataTableSkeleton,
  OverflowMenu,
  OverflowMenuItem,
  Icon
} from "carbon-components-react";
import {
  iconDownload,
  iconEdit,
  iconDelete,
  iconSettings,
  iconArrowUp,
  iconArrowDown
} from "carbon-icons";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarAction
} = DataTable;

const headers = [{ key: "field1", header: "F1" }];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          id: "a",
          field1: "Field 1a"
        },
        {
          id: "b",
          field1: "Field 1b"
        },
        {
          id: "c",
          field1: "Field 1c"
        }
      ]
    };
    setTimeout(() => {
      var s = { ...this.state };
      var newRow = [{ id: "d", field1: "Added field D" }];
      s.rows = s.rows.concat(newRow);
      //       s.theRows.push({ id: "d", field1: "Added field D" });
      console.log("set state to ", { ...s });
      this.setState({ ...s });
    }, 3000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("should update", nextState);
    return true;
  }

  removeRows(selectedRows) {
    console.log("trash", selectedRows);
    const currState = { ...this.state };
    var keepRows = currState.rows.filter(pr => {
      var match = selectedRows.find(sr => {
        console.log(`pr ${pr.id} vs sr ${sr.id}`);
        return pr.id === sr.id;
      });
      console.log("match for pr", pr, match);
      return !match;
    });
    this.setState(prevState => ({
      ...prevState,
      rows: keepRows
    }));
  }

  render() {
    return (
      <React.Fragment>
        <DataTableSkeleton headers={headers.map(h => h.header)} />
        <DataTable
          rows={this.state.rows}
          headers={headers}
          render={({
            rows,
            headers,
            getHeaderProps,
            getSelectionProps,
            selectedRows
          }) => {
            console.log("rendering", rows);
            return (
              <TableContainer title="DataTable">
                <TableToolbar>
                  <TableToolbarContent>
                    <TableToolbarAction
                      icon={iconDelete}
                      iconDescription="Edit"
                      {...{
                        onClick: ev => this.removeRows(selectedRows)
                      }}
                    />
                  </TableToolbarContent>
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map(header => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader />
                      <TableHeader />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        <TableCell>
                          <span>&nbsp;</span>
                          <Icon
                            icon={iconArrowDown}
                            description="down"
                            onClick={() => console.log("down", row.id)}
                          />
                          <span>&nbsp;</span>
                          <Icon
                            icon={iconArrowUp}
                            description="up it goes"
                            onClick={() => console.log("up", row.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <OverflowMenu>
                            <OverflowMenuItem
                              itemText="Option 1"
                              primaryFocus
                              onClick={() => console.log("o1", this)}
                            />
                            <OverflowMenuItem
                              itemText="Option 2"
                              onClick={() => console.log("o2", this)}
                            />
                          </OverflowMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        />
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
