---
date_created: 2025-03-27
date_modified: 2025-09-17
date_authored_initial_draft: 2024-08-02
date_authored_current_draft: 2025-04-24
site_uuid: d603567e-e011-4bd8-b0e3-1e448c99598f
publish: true
title: We Need Better Charts
slug: we-need-better-charts
at_semantic_version: 0.0.1.4
tags: [Data-Visualizations, Diagrams-as-Code, Charts-as-Code]
lede: We have the opportunity to make data visualization as easy as the AI chatbot. Let's do it!
image_prompt: A robot representing AI is presenting a slide deck with charts and graphs to a board room of people.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/We_need_better_Charts_banner_image_1758139229989_upBvY4iCM.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/We_need_better_Charts_portrait_image_1758139232336_jvlGQXkR4.webp
square_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/We_need_better_Charts_square_image_1758139234498_9YHJEa0lA.webp
authors:
  - Michael Staton
augmented_with: Qwen Coder 3
---


Data visualization has seen significant advancements over the years, dramatically improving our ability to explore, understand, and convey complex information effectively. Here are some key innovations:

1. **Interactive Visualizations**: The advent of interactive visualizations has revolutionized data exploration. Tools like [[Tooling/Data Utilities/Tableau|Tableau]], [[Tooling/Data Utilities/PowerBI|PowerBI]], or [[Tooling/Software Development/Programming Languages/Libraries/D3.js|D3.js]] allow users to manipulate variables and see immediate changes in the data representation. This interactivity fosters a deeper understanding and encourages exploration.

2. **Real-time Data Visualization**: With big data technologies, real-time visualization has become possible. Tools like Apache [[Tooling/Data Utilities/Kafka|Kafka]] and Apache Storm enable immediate data processing and display, providing instant insights and facilitating quicker decision-making.

3. **Augmented Reality (AR) & Virtual Reality (VR)**, [[Vocabulary/Extended Reality|Extended Reality]]: AR and VR are emerging as powerful tools for data visualization. They offer immersive experiences that can reveal patterns and trends in ways traditional 2D visualizations cannot. For instance, Microsoft's HoloLens allows users to visualize and interact with holographic data in the real world.

4. **[[Vocabulary/Machine Learning|Machine Learning]] Integration**: Machine learning algorithms are now being used to automatically generate visualizations or suggest optimal representations of complex datasets. Tools like DataRobot and Automated Insights' Wordsmith use AI to interpret data and create narratives or visuals, making data analysis more accessible.

5. **Advanced Chart Types & Designs**: New types of charts and graphical designs have been developed to represent specific kinds of data more effectively. For example, the sunburst chart is useful for hierarchical data, while the parallel coordinates plot can display multidimensional data. 

6. **Storytelling Platforms**: Tools like [[Tooling/Data Utilities/Datawrapper]] or [[Tooling/Data Utilities/Flourish Studio|Flourish Studio]] not only create visualizations but also guide users in crafting compelling narratives around their data. This blend of visualization and storytelling enhances the communicative power of data.

7. **Big Data Visualization Tools**: As datasets grow larger, specialized tools are needed to handle them. Software like Apache [[Kibala]] or [[Tooling/Software Development/Developer Experience/DevOps/Grafana Labs|Grafana]] offer robust solutions for visualizing large-scale data sets efficiently.

8. **Accessibility Features**: Recent advancements have also focused on making data visualizations more accessible. This includes features like color contrast adjustments for those with color blindness, text alternatives for visual elements, and interactive guides for users with cognitive disabilities. 

These innovations have not only made data analysis more efficient but have also opened up new avenues for creative expression and communication in the realm of data storytelling.

Creating "charts as code" involves using programming languages or libraries to generate visualizations programmatically rather than manually through graphical user interfaces (GUIs). Here are several methods that serve this purpose:

1. **[[Tooling/Software Development/Programming Languages/Libraries/D3.js|D3.js]]**: D3.js (Data-Driven Documents) is a [[Tooling/Software Development/Programming Languages/JavaScript|JavaScript]] [[Vocabulary/Packages and Libraries|Library]] for producing dynamic, interactive data visualizations in web browsers. It allows you to manipulate documents based on data and gives you the power to generate complex, custom visualizations. Although it requires some knowledge of JavaScript and HTML/CSS, D3.js offers an extensive set of features and flexibility, making it a popular choice for creating "charts as code."

   Example:
   ```javascript
   d3.select("body")
     .selectAll("div")
     .data(d3.range(8))
     .enter().append("div")
       .style("width", function(d, i) { return 50 + i * 10; })
       .text(function(d) { return d; });
   ```

2. **Plotly.js**: This is another JavaScript library that allows you to create interactive plots and charts in web browsers. It's built on top of D3.js and provides a simpler, higher-level API for creating a wide range of chart types. Plotly.js supports both client-side rendering (in the browser) and server-side rendering (using Node.js).

   Example:
   ```javascript
   <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
   var trace1 = {
     x: [1, 2, 3],
     y: [4, 5, 6],
     type: 'scatter'
   };

   Plotly.newPlot('myDiv', [trace1]);
   ```

3. **R & ggplot2**: In the R programming language, `ggplot2` is a powerful and popular package for data visualization. It uses a grammar of graphics approach, allowing you to build up plots layer by layer using a consistent syntax. While not exactly "code as charts" in the web-based sense, it's highly customizable and can be used to generate static or interactive plots (with Shiny or Plotly).

   Example:
   ```R
   library(ggplot2)
   
   ggplot(mtcars, aes(x = wt, y = mpg)) + 
     geom_point() + 
     theme_minimal()
   ```

4. **Python & Matplotlib/Seaborn**: Python's libraries `matplotlib` and `seaborn` offer similar functionality to R's ggplot2. They enable the creation of static, customizable plots directly from code. Again, while not web-based "charts as code," they're highly versatile for data visualization tasks.

   Example (Matplotlib):
   ```python
   import matplotlib.pyplot as plt
   import numpy as np

   x = np.linspace(0, 10, 100)
   y = np.sin(x)

   plt.plot(x, y)
   plt.show()
   ```

5. **[[Tooling/Data Utilities/Jupyter Notebooks|Jupyter Notebooks]] & Matplotlib/Seaborn**: Jupyter Notebooks are interactive computing environments that allow you to create and share documents containing live code, equations, visualizations, and narrative text. They support Python (with libraries like Matplotlib or Seaborn) and R (with ggplot2), enabling "charts as code" in an interactive notebook format.

6. **[[Tooling/Data Utilities/Marimo|Marimo]]**: Marimo is a lightweight, simple, and fast charting library for the web written in TypeScript. It aims to provide a straightforward API similar to D3 but with less boilerplate.

7. **[[Tooling/Software Development/Developer Experience/DevTools/Vega|Vega]] & Vega-Lite**: These are higher-level visualization specifications based on JSON grammars that can be used for creating complex interactive visualizations. They're not programming languages per se, but rather a way of describing what the chart should look like, which can then be rendered in various ways (including D3.js).

   Example (Vega):
   ```json
   {
     "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
     "data": {"url": "your-data-source"},
     "mark": "bar",
     "encoding": {
       "x": {"field": "category", "type": "ordinal"},
       "y": {"field": "value", "type": "quantitative"}
     }
   }
   ```

8. **[[Tooling/Enterprise Jobs-to-be-Done/Plotly|Plotly]] Python & Dash**: Plotly's Python library can create interactive plots, and Dash (also by Plotly) is a productive Python framework for building analytical web applications. This combo lets you build "charts as code" in a web application context with Python.

   Example:
   ```python
   import plotly.express as px

   fig = px.bar(df, x="category", y="value")
   fig.show()
   ```

Each of these methods has its strengths and is suited to different needs, ranging from web-based interactive visualizations (D3.js, Plotly) to static plots in reports or documents (R's ggplot2, Python's Matplotlib/Seaborn). Some are more powerful but have a steeper learning curve (like D3.js), while others offer simplicity and ease of use at the cost of some flexibility (like [[Tooling/Software Development/Frameworks/Web Frameworks/Mermaid.js|Mermaid.js]] for diagrams).


# Sources
***

[^b0kjrg]: 2023, May. "[How to Create Stunning Graphs in the Terminal with Python | Medium](https://medium.com/@SrvZ/how-to-create-stunning-graphs-in-the-terminal-with-python-2adf9d012131)". Sourav De. [Medium](https://medium.com).
[^xwms8y]: 2024, Jan. "[How to Draw ASCII Diagrams in the Shell | Baeldung on Linux | Baeldung on Linux](https://www.baeldung.com/linux/shell-ascii-diagrams)". default on most Linux installations. [Baeldung on Linux](https://www.baeldung.com).