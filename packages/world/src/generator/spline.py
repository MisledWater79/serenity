import numpy as np
import matplotlib.pyplot as plt

# Cubic spline class
class CubicSpline:
    def __init__(self, points, values, derivatives):
        if len(points) != len(values) or len(points) != len(derivatives):
            raise ValueError("Points, values, and derivatives arrays must have the same length.")
        self.points = points
        self.values = values
        self.derivatives = derivatives

    def h(self, i):
        return self.points[i + 1] - self.points[i]

    def a(self, i):
        return self.values[i]

    def b(self, i):
        return self.derivatives[i]

    def c(self, i):
        return (3 / self.h(i)**2) * (self.values[i + 1] - self.values[i]) - (self.derivatives[i + 1] + 2 * self.derivatives[i]) / self.h(i)

    def d(self, i):
        return (-2 / self.h(i)**3) * (self.values[i + 1] - self.values[i]) + (self.derivatives[i + 1] + self.derivatives[i]) / self.h(i)**2

    def interpolate(self, x):
        if x < self.points[0] or x > self.points[-1]:
            raise ValueError("Value to interpolate is outside the range of the spline.")
        i = 0
        while i < len(self.points) - 1 and x > self.points[i + 1]:
            i += 1
        dx = x - self.points[i]
        return self.a(i) + self.b(i) * dx + self.c(i) * dx**2 + self.d(i) * dx**3

def getSplineVal(con, ero, pav, spline):
	cord = 0
	if spline.coordinate == "minecraft:overworld/continents": cord = con
	if spline.coordinate == "minecraft:overworld/erosion": cord = ero
	if spline.coordinate == "minecraft:overworld/ridges_folded": cord = pav
    points = []
	values = []
	derivatives = []
	for p in spline.points:
		points.push(p.location)
		derivatives.push(p.derivative)
		if type(p.value) != "<class 'dict'>": values.push(p.value)
		else: values.push(getSplineVal(con, ero, pav, p.value))

	c = CubicSpline(points, values, derivatives)
	return c.interpolate(cord)

# New example with provided values
points = [-1.1, -1.02, -0.51, -0.44, -0.18, -0.16, -0.15, -0.1, 0.25, 1]
values = [0.044, -0.2222, -0.2222, -0.12, -0.12, 1, 1, 1.05, 1.1, 1.15]
derivatives = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

spline = CubicSpline(points, values, derivatives)

# Generate points for the plot
x_values = np.linspace(points[0], points[-1], 400)
y_values = [spline.interpolate(x) for x in x_values]

# Plot the cubic spline
plt.plot(x_values, y_values, label="Cubic Spline")
plt.scatter(points, values, color='red', zorder=5)
plt.title("Cubic Spline Interpolation with Given Values")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.grid(True)
plt.show()
