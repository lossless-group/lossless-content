---
date_created: 2025-05-18
date_modified: 2025-07-23
site_uuid: f1448846-3835-40e2-87c3-18671703ada5
publish: true
title: Up And Running With Marimo
slug: up-and-running-with-marimo
at_semantic_version: 0.0.0.1
tags: [Data-Analysis, Interactive-Notebooks]
---



```zsh
.venv/bin/pip install --target=./packages/marimo marimo
```

Prepend the Marimo package path and bin path to the PYTHONPATH and PATH environment variables, respectively. This is in the .venv/bin/activate script.
```python
# Prepend Marimo package path
PYTHONPATH="packages/marimo:$PYTHONPATH"
export PYTHONPATH

# Prepend Marimo bin path
PATH="packages/marimo/bin:$PATH"
export PATH
```

This will do the following when you run source .venv/bin/activate:

1.  PYTHONPATH Modification:
    This line prepends the directory packages/marimo to your PYTHONPATH environment variable.
    Effect: When your Python interpreter (from the activated .venv) looks for modules to import (e.g., import marimo), it searches a list of directories. PYTHONPATH is one of the first places it looks (after the current script's directory, but before the standard library and the virtual environment's site-packages).
    It does not make this the only path Python uses. It adds packages/marimo as a high-priority location for Python to search for modules. If Python finds the marimo package (or any of its dependencies that you might have placed there) inside this directory, it will use that version. If it doesn't find the specific module there, it will continue searching in other locations in PYTHONPATH, then your virtual environment's site-packages, etc.
    So, yes, Python "knows" to look in packages/marimo for the marimo Python package and its modules because you've told it to via PYTHONPATH.
2.  PATH Modification:
    This line prepends the directory packages/marimo/bin to your PATH environment variable.
    Effect: When you type a command (like marimo edit) in your terminal, your shell searches for an executable file with that name in the directories listed in your PATH, in the order they appear.
    It does not make this the only path for executables. It adds packages/marimo/bin as a high-priority location for your shell to search for executable commands. If the marimo command-line tool is in that bin directory, the shell will find and use it. If not, or if you type a different command, the shell continues searching other directories in your PATH (like your virtual environment's .venv/bin, /usr/local/bin, /bin, etc.).
    So, yes, your shell "knows" that marimo commands (like marimo edit) might be sourced from packages/marimo/bin because you've added that directory to the PATH.

In Summary:

•    These changes are active only when this specific virtual environment is activated. When you deactivate it, PATH and PYTHONPATH typically revert to their previous states.
•    You are adding preferential search paths. You're telling Python and your shell: "When looking for modules or commands, check these specific marimo locations first (or very early in the search process), but if you don't find what you're looking for there, continue searching your other configured paths."
•    This setup makes the marimo installation in packages/marimo take precedence over a version of marimo that might be installed directly into your .venv/lib/pythonX.Y/site-packages (for imports) or .venv/bin (for executables), because the paths you're adding are prepended.

# Uploading a CSV file

```python
import marimo

# generated with ended up being important. 
__generated_with = "0.13.10"
app = marimo.App()


@app.cell
def _():
    import marimo as mo
    # Create the file upload widget and display it
    f = mo.ui.file(kind="button", filetypes=[".csv"])
    f  # This line ensures the button is shown
    return f, mo


@app.cell
def _(f, mo):
    mo.stop(len(f.value) == 0, mo.md("Please upload a CSV file."))
    import polars as pl
    df = pl.read_csv(f.value[0].contents, separator=";")
    df # you have to list the variable by itself to show it in the app
    return


if __name__ == "__main__":
    app.run()
```

Working code to clean commas out of CSV files:

```python
import marimo

__generated_with = "0.13.10"
app = marimo.App()


@app.cell
def _():
    import marimo as mo
    # Create the file upload widget and display it
    f = mo.ui.file(kind="button", filetypes=[".csv"])
    f  # This line ensures the button is shown
    return f, mo


@app.cell
def _(f, mo):
    mo.stop(len(f.value) == 0, mo.md("Please upload a CSV file."))
    import polars as pl
    df = pl.read_csv(f.value[0].contents, separator=";")
    df
    return df, pl

@app.cell
def _(df, pl):
    # Process each column individually to handle nulls properly
    processed_columns = []
    
    for col in df.columns:
        # Apply string replacement only to non-null values, keep as strings
        processed_col = (
            pl.when(pl.col(col).is_null())
            .then(pl.lit(None))
            .otherwise(
                pl.col(col)
                .cast(pl.Utf8)
                .str.replace_all(r"\.", "")
                # No conversion to Int64, keep as strings
            )
            .alias(col)
        )
        processed_columns.append(processed_col)
    return processed_columns

@app.cell
def _(df, processed_columns):
    # Apply all the column transformations
    df_clean = df.with_columns(processed_columns)
    
    # Display the cleaned dataframe
    df_clean
    return df_clean

@app.cell
def _(df_clean):
    # Get marimo for displaying message
    import marimo as mo
    
    # Save the CSV file
    df_clean.write_csv("transformed_output.csv")
    
    # Display a confirmation message
    mo.md("**Success!** Transformed CSV saved as `transformed_output.csv`")
    return


if __name__ == "__main__":
    app.run()
```

Install Plotly, the interactive graphing library for Python ✨

```zsh
.venv/bin/pip install plotly
```

First dummy plot:

```python
import marimo

__generated_with = "0.13.10"
app = marimo.App()


@app.cell
def _():
    import marimo as mo
    import pandas as pd
    import plotly.express as px
    
    # Create a simple scatter plot
    plot = mo.ui.plotly(
        px.scatter(x=[0, 1, 4, 9, 16], y=[0, 1, 2, 3, 4], width=600, height=300)
    )
    plot
    return plot, px, pd, mo


if __name__ == "__main__":
    app.run()
```

## Iterating Into Dynamic Dropdowns for Data Visualization:

```python
import marimo

__generated_with = "0.13.10"
app = marimo.App()


@app.cell
def _():
    import marimo as mo
    f = mo.ui.file(kind="button", filetypes=[".csv"])
    f
    return f, mo


@app.cell
def _(f, mo):
    mo.stop(len(f.value) == 0, mo.md("Please upload a CSV file."))
    import polars as pl
    df = pl.read_csv(f.value[0].contents, separator=",")
    df
    return (df,)


@app.cell
def _(df, mo):
    import plotly.graph_objects as pogo
    # Get the numeric columns for plotting
    cols_for_plotting = df.columns
    x_col = cols_for_plotting[0]
    y_cols = cols_for_plotting[1:]

    # Create a figure
    fig = pogo.Figure()
    for y_col in y_cols:
       fig.add_trace(pogo.Scatter(x=df[x_col], y=df[y_col], name=y_col))

    buttons = []

    # Add all traces and prepare dropdown options
    for i, y_col in enumerate(y_cols):
       visibility = [i == j for j in range(len(y_cols))]
       buttons.append(
          dict(
             label=y_col,
             method="update",
             args=[
                {"visible": visibility},
                {"title": f"{y_col} vs {x_col}"}
             ]
          )
       )

    # Add 'All Traces' button
    buttons.insert(0, 
       dict(
          label="All Traces",
          method="update",
          args=[
             {"visible": [True] * len(y_cols)},
             {"title": f"All columns vs {x_col}"}
          ]
       )
    )

    # Add dropdown menu
    fig.update_layout(
       updatemenus=[
          dict(
             buttons=buttons,
             direction="down",
             x=0.1,
             y=1.1,
          ),
         ]
     )

    fig_display = mo.ui.plotly(fig)
    fig_display
    return


if __name__ == "__main__":
    app.run()
```
