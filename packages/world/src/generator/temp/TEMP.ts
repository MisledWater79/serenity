class Multipoint<C, I extends ToFloatFunction<C>>(I coordinate, float[] locations, List<CubicSpline<C, I>> values, float[] derivatives, float minValue, float maxValue) implements CubicSpline<C, I> {
  final float[] locations;

  public Multipoint(I $$0, float[] $$1, List<CubicSpline<C, I>> $$2, float[] $$3, float $$4, float $$5) {
      validateSizes($$1, $$2, $$3);
      this.coordinate = $$0;
      this.locations = $$1;
      this.values = $$2;
      this.derivatives = $$3;
      this.minValue = $$4;
      this.maxValue = $$5;
  }

  static <C, I extends ToFloatFunction<C>> Multipoint<C, I> create(I $$0, float[] $$1, List<CubicSpline<C, I>> $$2, float[] $$3) {
      validateSizes($$1, $$2, $$3);
      int $$4 = $$1.length - 1;
      float $$5 = Float.POSITIVE_INFINITY;
      float $$6 = Float.NEGATIVE_INFINITY;
      float $$7 = $$0.minValue();
      float $$8 = $$0.maxValue();
      float $$11;
      float $$15;
      if ($$7 < $$1[0]) {
          $$11 = linearExtend($$7, $$1, ((CubicSpline)$$2.get(0)).minValue(), $$3, 0);
          $$15 = linearExtend($$7, $$1, ((CubicSpline)$$2.get(0)).maxValue(), $$3, 0);
          $$5 = Math.min($$5, Math.min($$11, $$15));
          $$6 = Math.max($$6, Math.max($$11, $$15));
      }

      if ($$8 > $$1[$$4]) {
          $$11 = linearExtend($$8, $$1, ((CubicSpline)$$2.get($$4)).minValue(), $$3, $$4);
          $$15 = linearExtend($$8, $$1, ((CubicSpline)$$2.get($$4)).maxValue(), $$3, $$4);
          $$5 = Math.min($$5, Math.min($$11, $$15));
          $$6 = Math.max($$6, Math.max($$11, $$15));
      }

      CubicSpline $$13;
      for(Iterator var31 = $$2.iterator(); var31.hasNext(); $$6 = Math.max($$6, $$13.maxValue())) {
          $$13 = (CubicSpline)var31.next();
          $$5 = Math.min($$5, $$13.minValue());
      }

      for(int $$14 = 0; $$14 < $$4; ++$$14) {
          $$15 = $$1[$$14];
          float $$16 = $$1[$$14 + 1];
          float $$17 = $$16 - $$15;
          CubicSpline<C, I> $$18 = (CubicSpline)$$2.get($$14);
          CubicSpline<C, I> $$19 = (CubicSpline)$$2.get($$14 + 1);
          float $$20 = $$18.minValue();
          float $$21 = $$18.maxValue();
          float $$22 = $$19.minValue();
          float $$23 = $$19.maxValue();
          float $$24 = $$3[$$14];
          float $$25 = $$3[$$14 + 1];
          if ($$24 != 0.0F || $$25 != 0.0F) {
              float $$26 = $$24 * $$17;
              float $$27 = $$25 * $$17;
              float $$28 = Math.min($$20, $$22);
              float $$29 = Math.max($$21, $$23);
              float $$30 = $$26 - $$23 + $$20;
              float $$31 = $$26 - $$22 + $$21;
              float $$32 = -$$27 + $$22 - $$21;
              float $$33 = -$$27 + $$23 - $$20;
              float $$34 = Math.min($$30, $$32);
              float $$35 = Math.max($$31, $$33);
              $$5 = Math.min($$5, $$28 + 0.25F * $$34);
              $$6 = Math.max($$6, $$29 + 0.25F * $$35);
          }
      }

      return new Multipoint($$0, $$1, $$2, $$3, $$5, $$6);
  }

  private static float linearExtend(float $$0, float[] $$1, float $$2, float[] $$3, int $$4) {
      float $$5 = $$3[$$4];
      return $$5 == 0.0F ? $$2 : $$2 + $$5 * ($$0 - $$1[$$4]);
  }

  private static <C, I extends ToFloatFunction<C>> void validateSizes(float[] $$0, List<CubicSpline<C, I>> $$1, float[] $$2) {
      if ($$0.length == $$1.size() && $$0.length == $$2.length) {
          if ($$0.length == 0) {
              throw new IllegalArgumentException("Cannot create a multipoint spline with no points");
          }
      } else {
          throw new IllegalArgumentException("All lengths must be equal, got: " + $$0.length + " " + $$1.size() + " " + $$2.length);
      }
  }

  public float apply(C $$0) {
      float $$1 = this.coordinate.apply($$0);
      int $$2 = findIntervalStart(this.locations, $$1);
      int $$3 = this.locations.length - 1;
      if ($$2 < 0) {
          return linearExtend($$1, this.locations, ((CubicSpline)this.values.get(0)).apply($$0), this.derivatives, 0);
      } else if ($$2 == $$3) {
          return linearExtend($$1, this.locations, ((CubicSpline)this.values.get($$3)).apply($$0), this.derivatives, $$3);
      } else {
          float $$4 = this.locations[$$2];
          float $$5 = this.locations[$$2 + 1];
          float $$6 = ($$1 - $$4) / ($$5 - $$4);
          ToFloatFunction<C> $$7 = (ToFloatFunction)this.values.get($$2);
          ToFloatFunction<C> $$8 = (ToFloatFunction)this.values.get($$2 + 1);
          float $$9 = this.derivatives[$$2];
          float $$10 = this.derivatives[$$2 + 1];
          float $$11 = $$7.apply($$0);
          float $$12 = $$8.apply($$0);
          float $$13 = $$9 * ($$5 - $$4) - ($$12 - $$11);
          float $$14 = -$$10 * ($$5 - $$4) + ($$12 - $$11);
          float $$15 = Mth.lerp($$6, $$11, $$12) + $$6 * (1.0F - $$6) * Mth.lerp($$6, $$13, $$14);
          return $$15;
      }
  }

  private static int findIntervalStart(float[] $$0, float $$1) {
      return Mth.binarySearch(0, $$0.length, ($$2) -> {
          return $$1 < $$0[$$2];
      }) - 1;
  }

  @VisibleForTesting
  public String parityString() {
      String var10000 = String.valueOf(this.coordinate);
      return "Spline{coordinate=" + var10000 + ", locations=" + this.toString(this.locations) + ", derivatives=" + this.toString(this.derivatives) + ", values=" + (String)this.values.stream().map(CubicSpline::parityString).collect(Collectors.joining(", ", "[", "]")) + "}";
  }

  private String toString(float[] $$0) {
      Stream var10000 = IntStream.range(0, $$0.length).mapToDouble(($$1) -> {
          return (double)$$0[$$1];
      }).mapToObj(($$0x) -> {
          return String.format(Locale.ROOT, "%.3f", $$0x);
      });
      return "[" + (String)var10000.collect(Collectors.joining(", ")) + "]";
  }

  public CubicSpline<C, I> mapAll(CoordinateVisitor<I> $$0) {
      return create((ToFloatFunction)$$0.visit(this.coordinate), this.locations, this.values().stream().map(($$1) -> {
          return $$1.mapAll($$0);
      }).toList(), this.derivatives);
  }

  public I coordinate() {
      return this.coordinate;
  }

  public float[] locations() {
      return this.locations;
  }

  public List<CubicSpline<C, I>> values() {
      return this.values;
  }

  public float[] derivatives() {
      return this.derivatives;
  }

  public float minValue() {
      return this.minValue;
  }

  public float maxValue() {
      return this.maxValue;
  }
}