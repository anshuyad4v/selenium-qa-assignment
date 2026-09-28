# Comprehensive QA Test Plan (Manual Test Suite)

**Target Application:** https://www.saucedemo.com/  
**Testing Scope:** Authentication, Inventory Catalog, Shopping Cart, Checkout Workflow.

## Manual Test Cases

| ID | Module | Scenario | Preconditions | Steps | Expected Result | Priority |
|---|---|---|---|---|---|---|
| TC-01 | Auth | Valid Login | On login page | 1. Enter `standard_user`<br>2. Enter `secret_sauce`<br>3. Click Login | Redirected to inventory page. Products visible. | High |
| TC-02 | Auth | Locked out account | On login page | 1. Enter `locked_out_user`<br>2. Enter `secret_sauce`<br>3. Click Login | Error: "Sorry, this user has been locked out." | High |
| TC-03 | Auth | Invalid password | On login page | 1. Enter `standard_user`<br>2. Enter `wrongpass`<br>3. Click Login | Error: "Username and password do not match" | High |
| TC-04 | Auth | Empty credentials | On login page | 1. Leave fields blank<br>2. Click Login | Error: "Username is required" | Medium |
| TC-05 | Auth | Empty password | On login page | 1. Enter user<br>2. Leave pass blank<br>3. Click Login | Error: "Password is required" | Medium |
| TC-06 | Auth | Protected Route bypass | Logged out | 1. Navigate to `/inventory.html` directly | Redirected to login with error "You can only access '/inventory.html' when you are logged in." | High |
| TC-07 | Auth | Logout flow | Logged in | 1. Open side menu<br>2. Click Logout | Redirected to login page. Session cleared. | High |
| TC-08 | Inventory | Default Sort | On inventory | 1. Check default product sorting | Items are sorted A to Z by default. | Low |
| TC-09 | Inventory | Sort Z to A | On inventory | 1. Select "Name (Z to A)" | Items re-order to Z-A. | Medium |
| TC-10 | Inventory | Sort Low to High | On inventory | 1. Select "Price (low to high)" | Cheapest item ($7.99) appears first. | High |
| TC-11 | Inventory | Sort High to Low | On inventory | 1. Select "Price (high to low)" | Most expensive ($49.99) appears first. | High |
| TC-12 | Inventory | Product Details | On inventory | 1. Click item image or title | Navigates to item detail page. Data matches inventory view. | Medium |
| TC-13 | Cart | Add single item | On inventory | 1. Click "Add to cart" | Badge updates to 1. Button changes to "Remove". | High |
| TC-14 | Cart | Add multiple items | On inventory | 1. Add 3 different items | Badge updates to 3. | High |
| TC-15 | Cart | Remove from inventory | Item in cart | 1. Click "Remove" | Badge decrements. Button reverts to "Add to cart". | Medium |
| TC-16 | Cart | Remove from cart page | Item in cart | 1. Go to Cart<br>2. Click "Remove" | Item removed from list. Badge updates. | High |
| TC-17 | Cart | Session persistence | Item in cart | 1. Refresh the page | Cart retains items. Badge state remains unchanged. | Medium |
| TC-18 | Checkout | Continue shopping | On Cart | 1. Click "Continue Shopping" | Redirects back to inventory. | Low |
| TC-19 | Checkout | Checkout with empty cart | Empty cart | 1. Go to Cart<br>2. Click Checkout | Should prevent checkout (Edge Case). | High |
| TC-20 | Checkout | Missing First Name | On step one | 1. Fill Last Name & Zip<br>2. Click Continue | Error: "First Name is required" | High |
| TC-21 | Checkout | Missing Last Name | On step one | 1. Fill First Name & Zip<br>2. Click Continue | Error: "Last Name is required" | High |
| TC-22 | Checkout | Missing Zip | On step one | 1. Fill Names<br>2. Click Continue | Error: "Postal Code is required" | High |
| TC-23 | Checkout | Special Characters | On step one | 1. Use apostrophes/hyphens (e.g. O'Connor) | System accepts valid name punctuation. | Low |
| TC-24 | Checkout | Tax Calculation | On step two | 1. Verify item total<br>2. Verify Tax | Tax is calculated at approx 8%. Total = Item + Tax. | High |
| TC-25 | Checkout | Finalize order | On step two | 1. Click Finish | Redirects to confirmation. Displays "Thank you for your order!". | High |
| TC-26 | Checkout | Post-payment back | On confirmation | 1. Click browser Back | Duplicate payment/order shouldn't trigger. | Medium |