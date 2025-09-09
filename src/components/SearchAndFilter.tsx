import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { CyberButton } from "@/components/ui/cyber-button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Calendar, 
  Star, 
  TrendingUp, 
  X,
  SlidersHorizontal
} from "lucide-react";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";

export interface FilterOptions {
  search: string;
  dateRange: "all" | "today" | "week" | "month";
  scoreRange: "all" | "high" | "medium" | "low";
  status: "all" | "completed" | "processing" | "failed";
  sortBy: "date" | "score" | "name";
  sortOrder: "asc" | "desc";
}

interface SearchAndFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  resultCount?: number;
  placeholder?: string;
}

export function SearchAndFilter({ 
  filters, 
  onFiltersChange, 
  resultCount,
  placeholder = "Search audits..." 
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.dateRange !== "all") count++;
    if (filters.scoreRange !== "all") count++;
    if (filters.status !== "all") count++;
    if (filters.sortBy !== "date" || filters.sortOrder !== "desc") count++;
    return count;
  }, [filters]);

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      dateRange: "all",
      scoreRange: "all", 
      status: "all",
      sortBy: "date",
      sortOrder: "desc"
    });
  };

  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 bg-card/50 border-border focus:border-primary focus:glow-primary"
          />
        </div>
        
        <CyberButton
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-warning text-warning-foreground px-1.5 py-0.5 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </CyberButton>
      </div>

      {/* Advanced Filters */}
      {isFilterOpen && (
        <GlassCard>
          <GlassCardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <GlassCardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </GlassCardTitle>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <CyberButton
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear All
                  </CyberButton>
                )}
                <CyberButton
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="h-3 w-3" />
                </CyberButton>
              </div>
            </div>
          </GlassCardHeader>
          
          <GlassCardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Range */}
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Date Range
                </label>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Time" },
                    { value: "today", label: "Today" },
                    { value: "week", label: "This Week" },
                    { value: "month", label: "This Month" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dateRange"
                        value={option.value}
                        checked={filters.dateRange === option.value}
                        onChange={(e) => updateFilter("dateRange", e.target.value as any)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Score Range */}
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  <Star className="h-4 w-4 inline mr-1" />
                  Score Range
                </label>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Scores" },
                    { value: "high", label: "High (80-100)" },
                    { value: "medium", label: "Medium (60-79)" },
                    { value: "low", label: "Low (0-59)" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="scoreRange"
                        value={option.value}
                        checked={filters.scoreRange === option.value}
                        onChange={(e) => updateFilter("scoreRange", e.target.value as any)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  <Filter className="h-4 w-4 inline mr-1" />
                  Status
                </label>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Status" },
                    { value: "completed", label: "Completed" },
                    { value: "processing", label: "Processing" },
                    { value: "failed", label: "Failed" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={filters.status === option.value}
                        onChange={(e) => updateFilter("status", e.target.value as any)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  Sort By
                </label>
                <div className="space-y-3">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter("sortBy", e.target.value as any)}
                    className="w-full bg-card/50 border border-border rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="date">Date</option>
                    <option value="score">Score</option>
                    <option value="name">Name</option>
                  </select>
                  
                  <div className="flex gap-2">
                    <CyberButton
                      variant={filters.sortOrder === "desc" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilter("sortOrder", "desc")}
                      className="flex-1"
                    >
                      Desc
                    </CyberButton>
                    <CyberButton
                      variant={filters.sortOrder === "asc" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilter("sortOrder", "asc")}
                      className="flex-1"
                    >
                      Asc
                    </CyberButton>
                  </div>
                </div>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      )}

      {/* Results Summary */}
      {resultCount !== undefined && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {resultCount} result{resultCount !== 1 ? "s" : ""} found
            {filters.search && ` for "${filters.search}"`}
          </span>
          
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2">
              <span>{activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active</span>
              <CyberButton
                variant="outline"
                size="sm"
                onClick={clearFilters}
              >
                Clear
              </CyberButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}