module Jekyll
  module ModFilter
    def mod(num, mod)
      num.to_i % mod.to_i
    end
  end
end

Liquid::Template.register_filter(Jekyll::ModFilter)
